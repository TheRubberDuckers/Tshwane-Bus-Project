#!/usr/bin/env python3
"""
Tshwane Bus Service Timetable Extractor
Extracts timetable data from PDF files and outputs structured JSON.

Usage:
    python3 extract_timetable.py file1.pdf file2.pdf ...
    python3 extract_timetable.py *.pdf
    python3 extract_timetable.py --dir /path/to/pdfs
    python3 extract_timetable.py file.pdf --output result.json
"""

import re
import sys
import json
import argparse
import subprocess
from pathlib import Path


def pdf_to_text(pdf_path: str) -> str:
    """Extract raw text from a PDF using pdftotext."""
    result = subprocess.run(
        ["pdftotext", pdf_path, "-"],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        raise RuntimeError(f"pdftotext failed for {pdf_path}: {result.stderr}")
    return result.stdout


def extract_route_name(text: str, pdf_path: str) -> str:
    """
    Extract the route name from the PDF text.
    Tries the bold title line first, then falls back to the filename.
    """
    lines = [l.strip() for l in text.splitlines() if l.strip()]

    # Look for an all-caps title line (e.g. "PRETORIA NORTH (1)" or "BOOYSENS")
    # Skip header lines that contain document metadata keywords
    skip_keywords = {"division", "section", "doc no", "revision", "page", "last reviewed", "timetable", "planning"}
    for line in lines[:20]:  # Only check top of document
        if line.isupper() and len(line) > 3:
            # Skip single-word metadata values and known header fields
            if any(kw in line.lower() for kw in skip_keywords):
                continue
            # Must look like a route name (letters + optional parens/numbers/spaces)
            if re.match(r'^[A-Z][A-Z0-9 ()&\-/]+$', line):
                return line.title()  # Convert "BOOYSENS" → "Booysens"

    # Fallback: use the PDF filename without extension
    return Path(pdf_path).stem.replace("-", " ").replace("_", " ").title()


def parse_times_column(raw: str) -> list[str]:
    """
    Parse a whitespace-separated block of times into a list.
    Handles annotations like (B), (C), (st), (B)C, etc.
    """
    # Match time patterns: HH:MM optionally followed by letter annotations
    pattern = r'\b\d{1,2}:\d{2}(?:\([A-Za-z]\))*[A-Za-z]?\b'
    return re.findall(pattern, raw)


def split_columns(section_text: str) -> tuple[list[str], list[str]]:
    """
    Given the text between section headers, split it into
    FROM CITY and TO CITY columns.

    Strategy: use pdftotext's default layout. The two columns are
    side-by-side. We look for lines that contain two times and split them,
    or treat each line as belonging to whichever column it was closer to.

    Since pdftotext doesn't always preserve columns perfectly, we take a
    pragmatic approach: collect all times in the block, then assign them
    to alternating "left" / "right" columns based on horizontal position
    IF using -layout mode, or fall back to a line-based heuristic.
    """
    # Try line-based splitting: if a line has two time-like tokens, it's a paired row.
    # Otherwise accumulate into a shared pool and split in half (last resort).
    from_times = []
    to_times = []

    lines = section_text.splitlines()
    paired_lines = 0

    for line in lines:
        times_on_line = re.findall(r'\b\d{1,2}:\d{2}(?:\([A-Za-z]\))*[A-Za-z]?\b', line)
        if len(times_on_line) == 2:
            # Two times on one line: left = FROM CITY, right = TO CITY
            from_times.append(times_on_line[0])
            to_times.append(times_on_line[1])
            paired_lines += 1
        elif len(times_on_line) == 1:
            # Single time — accumulate; will sort out below
            # Heuristic: if paired lines found, this is probably overflow from one col
            pass  # handled in second pass

    # If we got paired lines, great — but also collect any unpaired singles
    # by re-scanning. Single-column overflow lines go into whichever list is shorter.
    if paired_lines > 0:
        for line in lines:
            times_on_line = re.findall(r'\b\d{1,2}:\d{2}(?:\([A-Za-z]\))*[A-Za-z]?\b', line)
            if len(times_on_line) == 1:
                if len(from_times) <= len(to_times):
                    from_times.append(times_on_line[0])
                else:
                    to_times.append(times_on_line[0])
        return from_times, to_times

    # Fallback: all times in the block, split in half
    all_times = parse_times_column(section_text)
    mid = len(all_times) // 2
    return all_times[:mid], all_times[mid:]


def extract_timetable(text: str) -> dict:
    """
    Parse the full PDF text and return a timetable dict with:
      weekdays: list of [from_city, to_city] pairs
      saturdays: list of [from_city, to_city] pairs  (or [] if no service)
      sundays:   list of [from_city, to_city] pairs  (or [] if no service)
    """

    # Normalise line endings
    text = text.replace('\r\n', '\n').replace('\r', '\n')

    # -----------------------------------------------------------------------
    # Locate section boundaries
    # We look for the headings:
    #   FROM CITY / TO CITY  (column headers line)
    #   MONDAYS TO FRIDAYS
    #   SATURDAYS
    #   SUNDAYS AND HOLIDAYS
    # -----------------------------------------------------------------------

    # Patterns for section headings (case-insensitive, allow extra whitespace)
    p_weekday  = re.compile(r'MONDAYS?\s+TO\s+FRIDAYS?', re.IGNORECASE)
    p_saturday = re.compile(r'SATURDAYS?', re.IGNORECASE)
    p_sunday   = re.compile(r'SUNDAYS?\s+AND\s+HOLIDAYS?', re.IGNORECASE)
    p_no_service = re.compile(r'no\s+service', re.IGNORECASE)

    m_weekday  = p_weekday.search(text)
    m_saturday = p_saturday.search(text)
    m_sunday   = p_sunday.search(text)

    def get_section(start_match, end_match) -> str:
        if start_match is None:
            return ""
        start = start_match.end()
        end   = end_match.start() if end_match else len(text)
        return text[start:end]

    weekday_text  = get_section(m_weekday,  m_saturday)
    saturday_text = get_section(m_saturday, m_sunday)
    sunday_text   = get_section(m_sunday,   None)

    def parse_section(section_text: str) -> list[list[str]]:
        """Return list of [from_city_time, to_city_time] pairs, or []."""
        if not section_text.strip():
            return []
        if p_no_service.search(section_text):
            return []

        from_times, to_times = split_columns(section_text)

        # Zip into pairs; pad shorter list with empty strings
        max_len = max(len(from_times), len(to_times))
        from_times += [""] * (max_len - len(from_times))
        to_times   += [""] * (max_len - len(to_times))

        return [[f, t] for f, t in zip(from_times, to_times) if f or t]

    return {
        "weekdays":  parse_section(weekday_text),
        "saturdays": parse_section(saturday_text),
        "sundays":   parse_section(sunday_text),
    }


def process_pdf(pdf_path: str) -> dict:
    """Process a single PDF and return a feature dict."""
    text = pdf_to_text(pdf_path)
    name = extract_route_name(text, pdf_path)
    times = extract_timetable(text)

    return {
        "name": name,
        "times": {
            "weekdays": times["weekdays"],
            "weekends": {
                "saturdays": times["saturdays"],
                "sundays":   times["sundays"],
            }
        }
    }


def main():
    parser = argparse.ArgumentParser(
        description="Extract Tshwane Bus timetables from PDF files to JSON."
    )
    parser.add_argument(
        "pdfs", nargs="*", metavar="PDF",
        help="One or more PDF files to process."
    )
    parser.add_argument(
        "--dir", metavar="DIRECTORY",
        help="Process all PDFs in this directory."
    )
    parser.add_argument(
        "--output", "-o", metavar="OUTPUT.json",
        help="Write JSON to this file (default: print to stdout)."
    )
    args = parser.parse_args()

    pdf_files = list(args.pdfs)

    if args.dir:
        dir_path = Path(args.dir)
        pdf_files += [str(p) for p in sorted(dir_path.glob("*.pdf"))]

    if not pdf_files:
        parser.print_help()
        sys.exit(1)

    features = []
    for pdf_path in pdf_files:
        try:
            feature = process_pdf(pdf_path)
            features.append(feature)
            print(f"✓ {pdf_path}  →  {feature['name']}", file=sys.stderr)
        except Exception as e:
            print(f"✗ {pdf_path}: {e}", file=sys.stderr)

    output = {"features": features}
    json_str = json.dumps(output, indent=2)

    if args.output:
        Path(args.output).write_text(json_str)
        print(f"\nSaved to {args.output}", file=sys.stderr)
    else:
        print(json_str)


if __name__ == "__main__":
    main()
