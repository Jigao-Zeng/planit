export function buildCalendar(year: number, month: number) {
  // JS Date: getDay() returns 0 = Sun, 1 = Mon, etc.
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];

  // add blank slots before the 1st
  for (let i = 0; i < firstDayIndex; i++) {
    cells.push(null);
  }

  // add actual dates
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  return cells;
}
