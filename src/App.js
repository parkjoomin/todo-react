// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';
import TodoPage from './components/TodoPage';
import UserTodoPage from './components/UserTodoPage';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [todos, setTodos] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // fetchTodos(date);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo-list" element={<TodoList />} />
        <Route path="/todo-page" element={<TodoPage />} />
        <Route path="/user-todo/:userId" element={<UserTodoPage />} />
        <Route
          path="/calendar"
          element={
            <div>
              <h1>Todo List & Calendar</h1>
              <div className="app-container">
                <div className="calendar-container">
                  <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;