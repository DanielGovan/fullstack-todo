import React from "react";
import TodoList from "./components/TodoList";

function App(props) {
  // add a panel that shows all active todolists and gives an option to create a new one
  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
