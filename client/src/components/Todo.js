import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import "./Todo.css";
function Todo({ id, children, onRemove, onUpdate }) {
  const { color } = useContext(AppContext);
  return (
    <div className="Todo" style={{ color }}>
      <button onClick={() => onRemove(id)}>X</button>
      <Link to={`/todos/${id}`}>
        {" "}
        {/* MY TDDO ID: {id}  */}
        {children}
      </Link>
      <button
        onClick={() => {
          const todoTitle = prompt("Enter your new todo name");
          onUpdate(id, todoTitle);
        }}
      >
        Edit
      </button>
    </div>
  );
}

export default Todo;
