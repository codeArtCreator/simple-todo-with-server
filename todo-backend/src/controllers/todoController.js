const Todo = require("../models/todoModel");

// Create a new todo
exports.createTodo = async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Retrieve all todos
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Retrieve a single todo by ID
exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).send("Todo not found");
        }
        res.json(todo);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a todo by ID
exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!todo) {
            return res.status(404).send("Todo not found");
        }
        res.json(todo);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a todo by ID
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndRemove(req.params.id);
        if (!todo) {
            return res.status(404).send("Todo not found");
        }
        res.json(todo);
    } catch (error) {
        res.status(500).send(error);
    }
};
