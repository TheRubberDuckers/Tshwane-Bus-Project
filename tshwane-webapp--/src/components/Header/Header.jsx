import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext";
import "./Header.css";

export default function Header() {
  const { searchTerm, setSearchTerm } = useSearch();
  const { user, canEdit, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header className="header">
      <Link to="/" className="header__brand" onClick={() => setSearchTerm("")}>
        <svg className="header__logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="4" y="3" width="16" height="15" rx="3" />
          <path d="M4 11h16M8 18v2M16 18v2" />
          <circle cx="8.5" cy="14.5" r=".8" fill="currentColor" />
          <circle cx="15.5" cy="14.5" r=".8" fill="currentColor" />
        </svg>
        <span>
          <span className="header__city">City of Tshwane</span>
          <strong className="header__title">Bus Route Planner</strong>
        </span>
      </Link>

      {pathname === "/" && (
        <label className="header__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Search route or stop…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search routes or stops"
          />
        </label>
      )}

      <nav className="header__nav">
        {canEdit && <NavLink to="/helper">Add routes</NavLink>}
        {user ? (
          <button className="header__link" onClick={() => { logout(); navigate("/"); }}>
            Log out ({user.username})
          </button>
        ) : (
          <NavLink to="/login">Helper login</NavLink>
        )}
      </nav>
    </header>
  );
}
