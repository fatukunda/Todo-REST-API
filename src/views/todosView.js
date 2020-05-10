const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// Adding todos
router.post("/todos", async (req, res) => {
  const todoData = req.body;
  try {
    const todo = new Todo(todoData);
    await todo.save();
    return res.status(201).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Fetch all todos
router.get("/todos", (req, res) => {
  Todo.find({})
    .then((todos) => {
      return res.status(200).send(todos);
    })
    .catch((error) => {
      return res.status(400).send(error);
    });
});

// Fetching a single todo Item
router.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).send({ error: "Todo not found!" });
    }
    res.status(200).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Completing a todo
router.patch("/todos/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).send({ error: "This todo item was not found." });
    }
    todo.isCompleted = true;
    await todo.save();
    res.status(200).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Deleting a single todo item
router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Todo.findByIdAndDelete(id);
    res
      .status(200)
      .send({ message: "Item deleted successfully!", data: response });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
