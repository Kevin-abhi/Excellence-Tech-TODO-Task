import {Box, Typography, Button, Alert} from '@mui/material';
import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import config from "./config.json";

const {apiOrigin} = config;

function App() {
  const [state, setState] = useState({
    todoItems: [],
    showResult: false,
    apiMessage: "",
    error: null,
  });
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, loginWithPopup, loginWithRedirect, getAccessTokenWithPopup} = useAuth0();


  useEffect(() => {
    // fires when app component mounts to the DOM
    console.log('init useEffect')
    
    callApi().catch(error => console.error('Init error', error))
  }, []);

  const callApi = async () => {
    try {
      
      const token = await getAccessTokenSilently();
      const response = await fetch(`${apiOrigin}/todo`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Keep-Alive": "timeout=5, max=1000"
        },
      });
      console.log('Fetch data', response.status, response.statusText)
      let responseData = await response.json();
      console.log('Get data', responseData);
      responseData = responseData.map((todo) => {
        if (todo.completed === undefined) {
          todo.completed = false;
        }
        return todo;
      })
      

      if (responseData) {
        setState({
          ...state, todoItems: responseData,
          error: null
        });
      }
    } catch (error) {
      console.error('API error', error)
      setState({
        ...state,
        error: error.error || error.message
      });
    }
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  
  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  async function addTodo(todo) {
    // adds new todo to beginning of todos array  
    
    const token = await getAccessTokenSilently();
    console.log('add', todo)
    const response = await fetch(`${apiOrigin}/todo`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(todo)
    });
    console.log('Post data', response.status, response.statusText)
    let responseData = await response.json();
    console.log('Post data response', responseData);
    await callApi();
  }

  async function toggleComplete(_id) {
    // find item
    let todoUpdated = state.todoItems.filter(todo => {
      return (todo._id === _id)
    })
    todoUpdated = todoUpdated[0]; // first item
    todoUpdated.completed = !todoUpdated.completed;

    const token = await getAccessTokenSilently();
    console.log('add', todoUpdated)
    const response = await fetch(`${apiOrigin}/todo/${_id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(todoUpdated)
    });
    console.log('Put data', response.status, response.statusText)
    let responseData = await response.json();
    console.log('Put data response', responseData);
    await callApi();
  }

  async function removeTodo(_id) {
    const token = await getAccessTokenSilently();
    console.log('delete', _id)
    const response = await fetch(`${apiOrigin}/todo/${_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "content-type": "application/json",
      }
    });
    console.log('Delete data', response.status, response.statusText)
    let responseData = await response.json();
    console.log('Delete data response', responseData);
    await callApi();
  }

  return (
    <div className="App">
      
        <Typography variant="h2">
          React Todo
        </Typography>
        <Typography style={{ padding: 10 }} variant="subtitle1">
          Auth0.com authentication - Codehooks.io API Backend
        </Typography>
        
        <Profile />

        {state.error === "login_required" && (
            <Alert severity="info">
              Authentication required: <Button variant="text" onClick={() => handleLoginAgain()}>Log In</Button>
            </Alert>
          )}
          {state.error === "consent_required" && (
            <Alert severity="warning">
              API concent required: <Button variant="text" onClick={() => handleConsent()}>Grant</Button>            
            </Alert>
          )}
        {isAuthenticated && <TodoForm addTodo={addTodo}/>}
          
          <Box sx={{margin: '2em'}}>
            <TodoList
              todos={isAuthenticated ? state.todoItems : []}
              removeTodo={removeTodo}
              toggleComplete={toggleComplete}
              isAuthenticated={isAuthenticated}        
            />
          </Box>
        
        <Box>
          {isAuthenticated ? <LogoutButton /> : ''}
          {state.error !== null && <Box sx={{color: 'lightgrey'}}>Debug data: {state.error}</Box>}
        </Box>                
      </div>      
  );
}

export default App;