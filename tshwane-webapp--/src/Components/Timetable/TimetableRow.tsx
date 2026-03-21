import React from "react";

type TimetableRowProps = {
  index: number;
  time: string;
  stopName: string;
};

export default function TimetableRow({ index, time, stopName }: TimetableRowProps) {
  return (
    <div className="flex justify-between p-2 border-b border-gray-200">
      <span className="font-semibold">{index}</span>
      <span>{time}</span>
      <span>{stopName}</span>
    </div>
  );
}
