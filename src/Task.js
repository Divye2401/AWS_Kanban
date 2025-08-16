import { useState } from "react";

export default function Task({
  task,
  boardId,
  boards,
  deleteTask,
  toggleTaskDone,
  moveTask,
  editTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  // ✅ Drag start
  function handleDragStart(e) {
    e.dataTransfer.setData(
      "task",
      JSON.stringify({ boardId, taskId: task.id })
    );
  }

  return (
    <li
      className="task-item"
      draggable={true}
      onDragStart={handleDragStart}
      style={{ margin: "10px" }}
    >
      {isEditing ? (
        <>
          <input value={newText} onChange={(e) => setNewText(e.target.value)} />
          <button
            onClick={() => {
              editTask(boardId, task.id, newText);
              setIsEditing(false);
            }}
          >
            💾
          </button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
            {task.text}
          </span>
          <button onClick={() => toggleTaskDone(boardId, task.id)}>✔</button>
          <button onClick={() => deleteTask(boardId, task.id)}>🗑</button>
          <button onClick={() => setIsEditing(true)}>✏</button>

          <select
            onChange={(e) => moveTask(boardId, task.id, Number(e.target.value))}
          >
            <option>Move to...</option>
            {boards
              .filter((b) => b.id !== boardId)
              .map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
          </select>
        </>
      )}
    </li>
  );
}
