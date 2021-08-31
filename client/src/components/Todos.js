import { useEffect } from "react";
import Todo from "./Todo";

function Todos({ todos, onRemove, onUpdate }) {
  useEffect(() => {
    console.log("BORN!");

    return () => {
      console.log("DIED!");
    };
  }, []);
  return (
    <div className="Todos">
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          id={todo._id}
          onRemove={onRemove}
          onUpdate={onUpdate}
        >
          {todo.title}
        </Todo>
      ))}
    </div>
  );
}

export default Todos;
