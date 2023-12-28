// UserTodoPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/UserTodoPage.css';

const BASE_URL = 'http://localhost:8000/account/todos/<int:pk>/';  // Django 서버의 URL에 맞게 변경

const UserTodoPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${userId}/`);
        setUser(response.data);
      } catch (error) {
        // 사용자가 없으면 홈 페이지로 이동
        navigate('/');
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  const TodoList = ({ todos }) => {
    const [completedTodos, setCompletedTodos] = useState([]);

    const handleCompleteClick = (index) => {
      setCompletedTodos((prevCompletedTodos) => {
        const isAlreadyCompleted = prevCompletedTodos.includes(index);

        if (isAlreadyCompleted) {
          return prevCompletedTodos.filter((completedIndex) => completedIndex !== index);
        } else {
          return [...prevCompletedTodos, index];
        }
      });
    };

    return (
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={`todo-item ${completedTodos.includes(index) ? 'completed' : ''}`}>
            <label>{todo.text}</label>
            <button onClick={() => handleCompleteClick(index)}>완료</button>
          </li>
        ))}
      </ul>
    );
  };

  const handleUpdateClick = async () => {
    // 사용자의 투두 리스트를 업데이트
    try {
      await axios.put(`${BASE_URL}${userId}/`, { todos: user.todos });
    } catch (error) {
      console.error('Error updating user todos:', error);
    }
  };

  const handleDeleteClick = async () => {
    // 사용자를 완전히 삭제하는 대신 deleted 플래그를 업데이트
    try {
      await axios.patch(`${BASE_URL}${userId}/`, { deleted: true });
      navigate('/');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      {user && (
        <div>
          <h1>{user.user.username}'s Todo List</h1>
          <TodoList todos={user.todos} />

          <button onClick={handleUpdateClick}>수정</button>
          <button onClick={handleDeleteClick}>삭제</button>
        </div>
      )}
    </div>
  );
};

export default UserTodoPage;
