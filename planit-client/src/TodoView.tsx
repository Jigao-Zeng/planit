import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./api/api";

export default function TodoPage() {
  const { year, month, day } = useParams();
  const navigate = useNavigate();

  const [todos, setTodos] = useState<{ id: number; title: string }[]>([]);
  const [newTitle, setNewTitle] = useState(""); // for input
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

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

  const startEdit = (id: number, title: string) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const handleSaveEdit = async () => {
    if (editingId === null) return;
    if (!editingTitle.trim()) return;

    const updated = await updateTodo(editingId, editingTitle);
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
    setEditingId(null);
    setEditingTitle("");
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
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
          <div
            key={t.id}
            className="border p-2 rounded flex items-center gap-2"
          >
            {editingId === t.id ? (
              <>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="flex-1 border rounded p-2"
                />
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditingTitle("");
                  }}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{t.title}</span>
                <button
                  onClick={() => startEdit(t.id, t.title)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
