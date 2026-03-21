import React from "react";
import TimetableCard from "./TimetableCard";

const sampleData = {
  route: "A1",
  outbound: ["05:00", "05:15", "05:30"],
  inbound: ["05:55", "06:10", "06:25"],
};

export default {
  title: "Timetable/TimetableCard",
  component: TimetableCard,
};

export const Default = () => <TimetableCard data={sampleData} />;
