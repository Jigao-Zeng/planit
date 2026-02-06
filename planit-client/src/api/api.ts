const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://localhost:5075";

export async function createTodo(date: string, title: string) {
  const res = await fetch(`${API_BASE_URL}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, title }),
  });
  return res.json();
}

export async function fetchTodos(date: string) {
  const res = await fetch(`${API_BASE_URL}/api/todos?date=${date}`);
  return res.json();
}
