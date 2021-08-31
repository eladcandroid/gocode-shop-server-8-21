import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../AppContext";

function TodoDetails() {
  const { id } = useParams();

  // METHOD 1 - Take the item from the context

  //   const { todos } = useContext(AppContext);
  //   const todo = todos.find((t) => t.id === +id);

  // METHOD 2 - Take the item from the server

  const [todo, setTodo] = useState();

  useEffect(() => {
    fetch(`/api/todos/${id}`)
      .then((res) => res.json())
      .then((json) => setTodo(json));
  }, [id]);

  return (
    <div>
      <h1>Todo Details</h1>
      {todo && todo.title}
    </div>
  );
}
export default TodoDetails;
