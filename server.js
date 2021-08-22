const fs = require("fs");

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.get("/todos", (req, res) => {
  fs.readFile("./todos.json", "utf8", (err, data) => {
    console.log(err);
    if (err) {
      res.send("BLAH!!!");
    } else {
      res.send(JSON.parse(data));
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

app.listen(8080);

// http
//   .createServer((req, res) => {
//     res.writeHead(200);
//     res.end("Hello World");
//   })
//   .listen(8080);

// import fs from "fs";

// import React from 'react';

// const fs = require("fs");

// fs.readFile("todos.json", "utf8", (err, data) => {
//   const todos = JSON.parse(data);

//   todos.push({
//     id: todos.length + 1,
//     title: "New todo",
//   });

//   fs.writeFile("todos.json", JSON.stringify(todos), (err) => {});
// });
