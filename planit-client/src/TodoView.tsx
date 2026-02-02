import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTodos, createTodo } from "./api/api";

export default function TodoPage() {
  const { year, month, day } = useParams();
  const navigate = useNavigate();

  const [todos, setTodos] = useState<{ id: number; title: string }[]>([]);
  const [newTitle, setNewTitle] = useState(""); // for input

  const pad = (n: number) => n.toString().padStart(2, "0");

  const dateStr =
    year && month && day
      ? `${year}-${pad(Number(month) + 1)}-${pad(Number(day))}`
      : "";

  // Load todos
  useEffect(() => {
    const loadTodos = async () => {
      if (!dateStr) return;
      const todos = await fetchTodos(dateStr);
      setTodos(todos);
    };
    loadTodos();
  }, [dateStr]);

  // Handle adding a todo
  const handleAddTodo = async () => {
    if (!newTitle.trim()) return;

    const todo = await createTodo(dateStr, newTitle);
    setTodos([...todos, todo]); // add new todo to state
    setNewTitle(""); // clear input
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 underline"
      >
        ← Back
      </button>

      <h1 className="text-xl font-bold">
        Todos in {year}-{pad(Number(month) + 1)}-{pad(Number(day))}
      </h1>

      {/* Add new todo */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="New todo..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Todos list */}
      <div className="mt-4 flex flex-col gap-2">
        {todos.map((t) => (
          <div key={t.id} className="border p-2 rounded">
            {t.title}
          </div>
        ))}
      </div>
    </div>
  );
}
