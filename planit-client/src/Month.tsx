import { buildCalendar } from "./helper";

interface MonthCalendarProps {
  month: number; // 0 = Jan
  year: number;
}

// Optional month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function MonthCalendar({ month, year }: MonthCalendarProps) {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const cells = buildCalendar(year, month);

  return (
    <div className="w-full max-w-xl border rounded p-4 shadow-sm">
      <h2 className="text-xl font-bold mb-2">{monthNames[month]}</h2>

      {/* Weekday Header */}
      <div className="grid grid-cols-7 text-center font-semibold border-b pb-2">
        {weekdays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2 mt-2 text-center">
        {cells.map((day, i) => (
          <div
            key={i}
            className={`h-12 flex items-center justify-center border rounded ${
              day === null ? "bg-gray-100" : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
