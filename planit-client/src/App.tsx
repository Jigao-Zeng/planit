import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./CalendarPage.tsx";
import TodoView from "./TodoView.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/todo/:year/:month/:day" element={<TodoView />} />
      </Routes>
    </BrowserRouter>
  );
}
