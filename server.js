const fs = require("fs");

const express = require("express");

const app = express();

const { v4: uuidv4 } = require("uuid");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.get("/todos", (req, res) => {
  fs.readFile("./todos.json", "utf8", (err, data) => {
    if (err) {
      fs.writeFile("./todos.json", "[]", (err) => {});
      res.send([]);
    } else {
      const { title } = req.query;

      let todos = JSON.parse(data);

      if (title) {
        todos = todos.filter((todo) =>
          todo.title
            ? todo.title.toLowerCase().includes(title.toLowerCase())
            : false
        );
      }

      res.send(todos);
    }
  });
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("./todos.json", "utf8", (err, data) => {
    const todos = JSON.parse(data);
    const todo = todos.find((todo) => todo.id === +id);
    res.send(todo);
  });
});

app.post("/todos", (req, res) => {
  const { title } = req.body;

  fs.readFile("./todos.json", "utf8", (err, data) => {
    const todos = JSON.parse(data);
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
      userId: "1",
    };
    todos.push(newTodo);
    fs.writeFile("./todos.json", JSON.stringify(todos), (err) => {});
  });
});

app.post("/todos", (req, res) => {
  const { title } = req.body;

  fs.readFile("./todos.json", "utf8", (err, data) => {
    const todos = JSON.parse(data);
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
      userId: "1",
    };
    todos.push(newTodo);
    fs.writeFile("./todos.json", JSON.stringify(todos), (err) => {});
    res.send("OK");
  });
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  fs.readFile("./todos.json", "utf8", (err, data) => {
    const todos = JSON.parse(data);
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.title = title;
      fs.writeFile("./todos.json", JSON.stringify(todos), (err) => {
        res.send("OK");
      });
    } else {
      res.send("Not found");
    }
  });
});

app.delete("/todos/:id", (req, res) => {
  try {
    const { id } = req.params;
    fs.readFile("./todos.json", "utf8", (err, data) => {
      const todos = JSON.parse(data);

      // METHOD 1:
      const todoIndex = todos.findIndex((todo) => todo.id === id);
      if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
        fs.writeFile("./todos.json", JSON.stringify(todos), (err) => {
          res.send("OK");
        });
      } else {
        res.send("Not found");
      }

      // METHOD 2:
      // const newTodos = todos.filter(todo=> todo.id !== id);
    });
  } catch (error) {
    res.send("Not found");
  }
});

app.get("*", (req, res) => {
  res.send(404);
});

function initTodos() {
  fs.readFile("./todos.json", "utf8", (err, data) => {
    if (!data) {
      fs.readFile("./initialTodos.json", "utf8", (err, data) => {
        let initialTodos = JSON.parse(data);
        initialTodos = initialTodos.map((todo) => ({ ...todo, id: uuidv4() }));
        fs.writeFile("./todos.json", JSON.stringify(initialTodos), (err) => {});
      });
    }
  });
}

initTodos();

app.listen(8080);
