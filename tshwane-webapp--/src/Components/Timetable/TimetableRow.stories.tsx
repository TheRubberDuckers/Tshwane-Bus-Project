import React from "react";
import TimetableRow from "./TimetableRow";

export default {
  title: "Timetable/TimetableRow",
  component: TimetableRow,
};

export const Default = () => <TimetableRow index={1} time="05:00" stopName="Soshanguve" />;
export const AnotherStop = () => <TimetableRow index={2} time="05:15" stopName="Mabopane" />;
