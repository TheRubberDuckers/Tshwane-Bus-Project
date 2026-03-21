import React from "react";
import TimetableRow from "./TimetableRow";

type TimetableCardProps = {
  data: {
    route: string;
    outbound: string[];
    inbound: string[];
  };
};

export default function TimetableCard({ data }: TimetableCardProps) {
  return (
    <div className="border rounded shadow p-4 max-w-md">
      <h2 className="text-lg font-bold mb-2">Route {data.route}</h2>

      <div className="flex gap-4">
        {/* Outbound Column */}
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Outbound</h3>
          {data.outbound.map((time, i) => (
            <TimetableRow key={i} index={i + 1} time={time} stopName="Soshanguve" />
          ))}
        </div>

        {/* Inbound Column */}
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Inbound</h3>
          {data.inbound.map((time, i) => (
            <TimetableRow key={i} index={i + 1} time={time} stopName="Pretoria CBD" />
          ))}
        </div>
      </div>
    </div>
  );
}
