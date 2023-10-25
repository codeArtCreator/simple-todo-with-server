import React, { useState, useEffect } from "react";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";

function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);

  useEffect(() => {
    // Fetch todos from the server when the component mounts
    fetch("http://localhost:5000/api/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error("Error fetching todos: " + error);
      });
  }, []);

  const handleChange = (id) => {
    // Implement the logic to update the completion status on the server
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        setCompletedTaskList([...completedTaskList, updatedTodo]);
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => {
        console.error("Error updating todo: " + error);
      });
  };

  const delTodo = (id) => {
    // Implement the logic to delete a todo on the server
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting todo: " + error);
      });
  };

  const addTodoItem = (title, tag, user) => {
    // Implement the logic to add a todo on the server
    fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        tag,
        user,
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
      })
      .catch((error) => {
        console.error("Error adding todo: " + error);
      });
  };

  return (
    <div className="container">
      <Header />
      <InputTodo addTodoProps={addTodoItem} />
      <TodosList
        todos={todos}
        handleChangeProps={handleChange}
        deleteTodoProps={delTodo}
        completedTaskList={completedTaskList}
      />
    </div>
  );
}

export default TodoContainer;
