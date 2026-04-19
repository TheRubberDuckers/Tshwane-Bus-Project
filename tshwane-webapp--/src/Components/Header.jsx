import { SearchContext } from "./Context";
import { useContext } from "react";
import BusIcon from "/Bus Icon.svg";
import SearchIcon from "/Search.svg";

export default function Header() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  return (
    <header className="flex flex-row bg-[#2c6e49] h-16 w-480 pt-3 pl-3 mt-13">
      <div className="mr-4 flex flex-row">
        <img src={BusIcon} className="w-8 -mt-2 mr-2" />
        <div>
          <h2 className="mr-4 text-xs">CITY OF TSHWANE</h2>
          <p>
            <b>Bus Route Planner</b>
          </p>
        </div>
      </div>

      <div className="border-solid border-l h-7 mr-4 mt-2" />

      <div className="flex flex-row border w-75 h-8 mt-1.5 rounded-lg bg-emerald-100/12">
        <img src={SearchIcon} className="w-6 ml-2" />
        <input
          className="px-2 text-sm focus:outline-none"
          type="text"
          placeholder="Search route or stop..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </header>
  );
}
