import { Checkbox, IconButton, ListItem, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from "react";

const Todo = ({ todo, toggleComplete, removeTodo }) => {
  function handleCheckboxClick() {
    toggleComplete(todo._id);
  }

  function handleRemoveClick() {
    removeTodo(todo._id);
  }

  return (
    <ListItem>
      <Checkbox checked={todo.completed} onClick={handleCheckboxClick} />
      <Typography
        variant="body1"
        style={{
          textDecoration: todo.completed ? "line-through" : null
        }}
      >
        {todo.task}
      </Typography>
      <IconButton onClick={handleRemoveClick}>
        <CloseIcon />
      </IconButton>
    </ListItem>
  );
}

export default Todo;