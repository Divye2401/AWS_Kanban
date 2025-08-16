import { useState, useEffect } from "react";
import Board from "./Board";
import { taskAPI } from "./api";
import "./App.css";

export default function App() {
  const [boards, setBoards] = useState([
    { id: 1, title: "Todo", tasks: [] },
    { id: 2, title: "In Progress", tasks: [] },
    { id: 3, title: "Done", tasks: [] },
  ]);
  const [loading, setLoading] = useState(true);

  // ✅ Load tasks from API on component mount
  useEffect(() => {
    loadTasks();
  }, []);
  //JG
  // ✅ Save to API whenever boards change (with debounce)
  useEffect(() => {
    if (!loading) {
      const timeoutId = setTimeout(() => {
        saveTasks();
      }, 500); // Debounce saves by 500ms

      return () => clearTimeout(timeoutId);
    }
  }, [boards, loading]);

  async function loadTasks() {
    try {
      setLoading(true);
      const boardsFromAPI = await taskAPI.getTasks();
      setBoards(boardsFromAPI);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveTasks() {
    try {
      await taskAPI.saveTasks(boards);
    } catch (error) {
      console.error("Failed to save tasks:", error);
      // Could show user notification here
    }
  }

  function addTask(boardId, text) {
    if (!text.trim()) return;
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: [...board.tasks, { id: Date.now(), text, done: false }],
            }
          : board
      )
    );
  }

  function deleteTask(boardId, taskId) {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.filter((task) => task.id !== taskId),
            }
          : board
      )
    );
  }

  function toggleTaskDone(boardId, taskId) {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task
              ),
            }
          : board
      )
    );
  }

  function moveTask(boardId, taskId, targetBoardId) {
    let taskToMove;
    const newBoards = boards
      .map((board) => {
        if (board.id === boardId) {
          taskToMove = board.tasks.find((t) => t.id === taskId);
          return {
            ...board,
            tasks: board.tasks.filter((t) => t.id !== taskId),
          };
        }
        return board;
      })
      .map((board) => {
        if (board.id === targetBoardId && taskToMove) {
          return { ...board, tasks: [...board.tasks, taskToMove] };
        }
        return board;
      });

    setBoards(newBoards);
  }

  function editTask(boardId, taskId, newText) {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.map((task) =>
                task.id === taskId ? { ...task, text: newText } : task
              ),
            }
          : board
      )
    );
  }

  // ✅ Handle drag drop
  function handleDrop(e, targetBoardId) {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("task"));
    moveTask(data.boardId, data.taskId, targetBoardId);
  }

  return (
    <>
      <header>
        🚀 Kanban Task Manager
        {loading && (
          <span
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.8em",
              marginLeft: "10px",
            }}
          >
            Loading...
          </span>
        )}
      </header>
      <div className="board-container">
        {boards.map((board) => (
          <div
            key={board.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, board.id)}
          >
            <Board
              board={board}
              boards={boards}
              addTask={addTask}
              deleteTask={deleteTask}
              toggleTaskDone={toggleTaskDone}
              moveTask={moveTask}
              editTask={editTask}
            />
          </div>
        ))}
      </div>
    </>
  );
}
