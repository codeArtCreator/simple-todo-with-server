const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// Create a new todo
router.post("/todos", todoController.createTodo);

// Retrieve all todos
router.get("/todos", todoController.getAllTodos);

// Retrieve a single todo by ID
router.get("/todos/:id", todoController.getTodoById);

// Update a todo by ID
router.put("/todos/:id", todoController.updateTodo);

// Delete a todo by ID
router.delete("/todos/:id", todoController.deleteTodo);

module.exports = router;
