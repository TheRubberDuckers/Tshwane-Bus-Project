import { SearchContext } from "./Context";
import { useContext } from "react";

export default function Header() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  return (
    <header className="flex flex-row bg-green-800 h-16 w-480 pt-2 pl-3 mt-13">
      <div className="mr-4">
        <h2 className="mr-4 text-xs">CITY OF TSHWANE</h2>
        <p>
          <b>Bus Route Planner</b>
        </p>
      </div>

      {/* Search bar */}
      <input
        className="border rounded-lg bg-emerald-100/12 px-2 text-sm h-8 w-75 mt-2"
        type="text"
        placeholder="Search route or stop..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </header>
  );
}
