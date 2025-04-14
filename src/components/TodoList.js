// import { List } from '@mui/material';
// import React from "react";
// import Todo from "./Todo";

// const TodoList = ({ todos, removeTodo, toggleComplete, isAuthenticated }) => {  
//   return (
//     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//       {todos.map(todo => (
//         <Todo
//           key={todo._id}
//           todo={todo}
//           removeTodo={removeTodo}
//           toggleComplete={toggleComplete}
//         />
//       ))}
//     </List>
//   );
// }

// export default TodoList;



import React, { useState } from "react";
import { List, ButtonGroup, Button } from "@mui/material";
import Todo from "./Todo";

const TodoList = ({ todos, removeTodo, toggleComplete }) => {
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true; // for "all"
  });

  return (
    <div>
      <ButtonGroup variant="outlined" size="small" sx={{ mb: 2 }}>
        <Button
          variant={filter === "all" ? "contained" : "outlined"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "completed" ? "contained" : "outlined"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
        <Button
          variant={filter === "incomplete" ? "contained" : "outlined"}
          onClick={() => setFilter("incomplete")}
        >
          Incomplete
        </Button>
      </ButtonGroup>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {filteredTodos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            removeTodo={removeTodo}
            toggleComplete={toggleComplete}
          />
        ))}
      </List>
    </div>
  );
};

export default TodoList;
