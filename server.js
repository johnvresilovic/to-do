//
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

//Environmental variables
const app = express();
const mongoURI = process.env.MONGO_URI;
const port = process.env.port || 3001;
const db = mongoose.connection;

//Connectign to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("strictQuery", true);
mongoose.connection.once("open", () => {
  console.log("bongo mongo");
});

//Middleware
app.use((req, res, next) => {
  console.log("I run for Iran...");
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

//Root
app.get("/", (req, res) => {
  res.render("Home");
});

//Index
app.get("/todo", (req, res) => {
  todo.find({}, (error, allTodos) => {
    res.render("Index", {
      todo: allTodos,
    });
  });
});

//New
app.get("/todo/new", (req, res) => {
  res.render("New");
});

//Delete
app.delete("/todo/:id", (req, res) => {
  todo.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/todo");
  });
});

//Update
app.put("/todo/:todoId", (req, res) => {
  
});

//Create (or Add)
app.post("/todo", (req, res) => {
  todo.create(req.body, (error, createdTodo) => {
    res.redirect("/todo");
  });
});

//Edit
app.get("/todo/:id/edit", (req, res) => {
  todo.findById(req.params.id, (err, foundTodo) => {
    if (!err) {
      res.render("Edit", {
        todo: foundTodo,
      });
    } else {
      res.send({ msg: err.message });
    }
  });
});

//Show
app.get("/todo/:todoId", function (req, res) {
  todo.findById(req.params.todoId, (err, foundTodo) => {
    res.render("Show", {
        todo: foundTodo,
    });
  });
});

//Port
app.listen(port, () => {
  console.log("Deathrace", port);
});
