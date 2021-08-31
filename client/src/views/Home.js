import { Button, TextField } from "@material-ui/core";
import { useContext, useEffect, useRef, useState } from "react";
import Todos from "../components/Todos";
import AppContext from "../AppContext";

function Home() {
  const { todos, setTodos } = useContext(AppContext);

  const onRemove = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        setTodos(todos.filter((todo) => todo._id !== id));
      });
  };

  const onUpdate = (id, todoTitle) => {
    const updateTodo = { title: todoTitle };

    console.log(id, todoTitle);

    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTodo),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos(
          todos.map((todo) => {
            return todo._id === id ? updatedTodo : todo;
          })
        );
      });
  };

  const [showTodos, setShowTodos] = useState(true);

  let todoTitle = "";
  const inputRef = useRef(null);

  // https://jsonplaceholder.typicode.com/todos
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onChange = (e) => {
    todoTitle = e.target.value;
  };

  const onSearch = (e) => {
    const search = e.target.value;
    // console.log("search", search);
    fetch(`/api/todos?title=${search}`)
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos);
      });
  };

  const addTodo = () => {
    const newTodo = {
      title: todoTitle,
    };

    fetch("/api/todos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((todo) => setTodos([...todos, todo]));
  };

  const buttonShukiRef = useRef(null);

  const { color, setColor } = useContext(AppContext);

  return (
    <>
      <TextField type="text" onChange={onSearch} label="Todo to Search" />
      <br />
      <TextField
        label="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <TextField
        ref={inputRef}
        type="text"
        onChange={onChange}
        label="Todo to add"
      />
      <Button
        color="primary"
        variant="contained"
        ref={buttonShukiRef}
        onClick={addTodo}
      >
        Add Todo
      </Button>
      <br />
      <br />
      <button onClick={() => setShowTodos(!showTodos)}>
        {showTodos ? "Hide" : "Show"} Todos
      </button>
      <div>Todos Count: {todos.length}</div>
      <header className="App-header">
        {showTodos && todos.length > 0 ? (
          <Todos todos={todos} onRemove={onRemove} onUpdate={onUpdate} />
        ) : (
          <div>No Todos!</div>
        )}
      </header>
    </>
  );
}

export default Home;
