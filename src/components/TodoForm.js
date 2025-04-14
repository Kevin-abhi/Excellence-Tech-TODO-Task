import { Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';

import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const TodoForm = ({ addTodo }) => {
  const [todo, setTodo] = useState({
    task: "",
    completed: false
  });

  function handleTaskInputChange(e) {
    // e.target.value contains new input from onChange
    // event for input elements
    setTodo({ ...todo, task: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents browser refresh
    // trim() gets rid of string whitespace
    if (todo.task.trim()) {
      console.log('Add todo', todo)
      addTodo(todo);
      setTodo({ ...todo, task: "" });
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <TextField
        label="Task"
        type="text"
        name="task"
        value={todo.task}
        onChange={handleTaskInputChange}
        variant="standard" 
      />
      {" "}
      <Button type="submit" variant="outlined" endIcon={<Add />}>new</Button>
      
    </form>
  );
}

export default TodoForm;