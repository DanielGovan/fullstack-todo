import axios from "axios";

const API_URL = "http://localhost:4000/todos/";

async function createTodo(task) {
  const { data: newTodo } = await axios.post(API_URL, {
    task,
  });
  return newTodo;
}

async function deleteTodo(id) {
  const message = await axios.delete(`${API_URL}${id}`);
  return message;
}

async function updateTodo(id, payload) {
  const { data: newTodo } = await axios.put(`${API_URL}${id}`, payload);
  return newTodo;
}

async function getAllTodos() {
  console.log("get sent");
  const { data: todos } = await axios.get(API_URL);
  return todos;
}

export default { createTodo, deleteTodo, updateTodo, getAllTodos };
