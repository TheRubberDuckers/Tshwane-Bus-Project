import { useContext } from "react";
import Times from "/src/assets/Map/Times.json";
import { SearchContext } from "./Context";

export default function TimeTable({ activeRoute }) {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const currentRoute = Times.features.find(
    (feature) => feature.name === activeRoute,
  );

  if (!currentRoute) {
    return (
      <div className="h-65 w-full">
        <p className="text-[#4a7060]"></p>
      </div>
    );
  }

  const schedule = currentRoute.times.weekdays;

  return (
    <div className="flex flex-col border border-solid border-l-[rgba(64,145,108,0.15)]">
      <div className="flex flex-row bg-[#edf7f1] border border-solid border-b-[rgba(64,145,108,0.15)]">
        <div className="w-40 text-black ml-2 mt-4">
          <p className="text-sm">{activeRoute}</p>
        </div>

        <div className="bg-[#edf7f1] w-full h-15 pt-3 flex justify-end">
          <div className="border border-solid border-[rgba(64,145,108,0.28)] rounded-full h-6 w-20 flex justify-center mr-1.5 hover:cursor-pointer hover:border-[#4a7060]">
            <p className="text-[#4a7060] text-xs pt-1">Weekdays</p>
          </div>
          <div className="border border-solid border-[rgba(64,145,108,0.28)] rounded-full h-6 w-20 flex justify-center mr-1.5 hover:cursor-pointer hover:border-[#4a7060]">
            <p className="text-[#4a7060] text-xs pt-1">Weekdends</p>
          </div>
        </div>
      </div>
      <div className="w-full max-h-50 overflow-auto">
        <table className="w-full position: relative divide-y divide-[rgba(64,145,108,0.28)]">
          <thead>
            <tr className="border border-b-[rgba(64,145,108,0.28)] h-12">
              <th className="text-[#4a7060] bg-[#f7fdf9]">Route In</th>
              <th className="text-[#4a7060] border border-[rgba(64,145,108,0.15)]">
                Route Out
              </th>
            </tr>
          </thead>
          <tbody>
            {schedule.length > 0 ? (
              schedule.map((time, index) => (
                <tr key={index}>
                  <td className="p-3 border-b border-[rgba(64,145,108,0.15)] text-[#4a7060] text-sm">
                    {time[0]}
                  </td>
                  <td className="p-3 border border-[rgba(64,145,108,0.15)] text-[#4a7060] text-sm ">
                    {time[1]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Service</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
