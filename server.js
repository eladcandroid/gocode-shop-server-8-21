const fs = require("fs");

const express = require("express");

const app = express();

const { v4: uuidv4 } = require("uuid");

const mongoose = require("mongoose");

app.use(express.json());

const todoSchema = new mongoose.Schema({
  title: String,
  userId: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.get("/todos", (req, res) => {
  const { title } = req.query;

  Todo.find((err, todos) => {
    if (title) {
      todos = todos.filter((todo) =>
        todo.title
          ? todo.title.toLowerCase().includes(title.toLowerCase())
          : false
      );
    }

    res.send(todos);
  });
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  Todo.findById(id, (err, todo) => {
    res.send(todo);
  });
});

app.post("/todos", (req, res) => {
  const { title } = req.body;

  const todo = new Todo({ title, completed: false, userId: "1" });

  todo.save();

  res.send("OK!");
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, userId } = req.body;

  const updatedFields = {};
  title ? (updatedFields.title = title) : null;
  userId ? (updatedFields.userId = userId) : null;

  Todo.findByIdAndUpdate(id, updatedFields, (err, todo) => {
    res.send(todo);
  });
});

app.delete("/todos/:id", (req, res) => {
  try {
    const { id } = req.params;
    Todo.findByIdAndDelete(id, (err, todo) => {
      console.log(todo);
      res.send(todo);
    });
  } catch (error) {
    res.send("Not found");
  }
});

app.get("*", (req, res) => {
  res.send(404);
});

function initTodos() {
  Todo.findOne((err, todo) => {
    if (!todo) {
      fs.readFile("./initialTodos.json", "utf8", (err, data) => {
        let initialTodos = JSON.parse(data);
        initialTodos = initialTodos.map((todo) => ({ ...todo, id: uuidv4() }));

        Todo.insertMany(initialTodos, (err, todos) => {});
      });
    }
  });
}

initTodos();

mongoose.connect(
  "mongodb://localhost/gocode_shop_8_21",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => {
    app.listen(8080);
  }
);
