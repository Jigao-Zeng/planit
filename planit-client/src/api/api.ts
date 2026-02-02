export async function createTodo(date: string, title: string) {
  const res = await fetch("http://localhost:5075/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, title }),
  });
  return res.json();
}

export async function fetchTodos(date: string) {
  const res = await fetch(`http://localhost:5075/api/todos?date=${date}`);
  return res.json();
}
