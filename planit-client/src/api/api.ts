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

export async function updateTodo(id: number, title: string) {
  const res = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function deleteTodo(id: number) {
  await fetch(`${API_BASE_URL}/api/todos/${id}`, {
    method: "DELETE",
  });
}
