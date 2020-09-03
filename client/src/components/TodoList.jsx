import React, { useState, useEffect } from "react";
import styles from "./TodoList.module.css";
import APIHelper from "./APIs.js";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const updateTodos = async () => {
      const todos = await APIHelper.getAllTodos();
      setTodos(todos);
    };
    updateTodos();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault();
    if (!todo) {
      return;
    }
    const newTodo = await APIHelper.createTodo(todo);
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      await APIHelper.deleteTodo(id);
      setTodos(todos.filter(({ _id: i }) => id !== i));
    } catch (err) {}
  };

  const updateTodo = async (e, id) => {
    e.stopPropagation();
    const payload = {
      completed: !todos.find((todo) => todo._id === id).completed,
    };
    const updatedTodo = await APIHelper.updateTodo(id, payload);
    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
  };

  return (
    <div className={styles.todoArea}>
      <div>
        <input
          type="text"
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
        />
        <button type="button" onClick={createTodo}>
          Add
        </button>
      </div>

      <ul className={styles.todoList}>
        {todos.map(({ _id, task, completed }, i) => (
          <li key={i} className={completed ? styles.completed : ""}>
            {task}{" "}
            <span
              className={styles.deleteTodo}
              onClick={(e) => updateTodo(e, _id)}
            >
              do
            </span>
            <span
              className={styles.deleteTodo}
              onClick={(e) => deleteTodo(e, _id)}
            >
              delete
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
