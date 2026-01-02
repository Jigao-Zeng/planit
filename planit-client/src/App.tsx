import "./App.css";
import Month from "./Month";

// Array of all months (0 = Jan, 11 = Dec)
const months = Array.from({ length: 12 }, (_, i) => i);

export default function App() {
  return (
    <div className="p-4 flex flex-col items-center gap-8">
      {months.map((month) => (
        <Month key={month} month={month} year={2026} />
      ))}
    </div>
  );
}
