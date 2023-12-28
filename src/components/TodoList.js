import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const TodoList = () => {
  const [userData, setUserData] = useState([
    { id: 1, name: 'User1', color: '#FF5733', todos: ['Todo 1', 'Todo 2'] },
    { id: 2, name: 'User2', color: '#33FF57', todos: ['Todo 3', 'Todo 4'] },
  ]);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    // 서버에서 실제 데이터를 가져오는 코드 (이 부분은 Django와의 통합 후에 수정될 것입니다)
    // fetchUserDataFromServer().then(data => setUserData(data));
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
  };

  const handleUserClick = (userId) => {
    // 사용자의 Todo 리스트를 보여주는 페이지로 이동
    navigate(`/user-todo/${userId}/`);
  };

  return (
    <div>
      <h1>{state && state.date ? `Todo List for ${formatDate(state.date)}` : 'Todo List'}</h1>
      {userData.map((user) => (
        <div
          key={user.id}
          style={{ border: `2px solid ${user.color}`, padding: '10px', marginBottom: '10px', cursor: 'pointer' }}
          onClick={() => handleUserClick(user.id)}
        >
          <h2>{user.name}'s Todos</h2>
          <ul>
            {user.todos.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>
      ))}
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default TodoList;







// import React from 'react';

// const TodoList = ({ todos }) => {
//   return (
//     <div className="todo-list">
//       <h2>Todo List</h2>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}></li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import TodoList from './TodoList'; // TodoList 컴포넌트 가져오기

// const TodoPage = () => {
//   const [todos, setTodos] = useState([]);
//   const { date } = useParams(); // URL 파라미터에서 날짜 정보 가져오기

//   useEffect(() => {
//     // 해당 날짜에 작성된 투두리스트를 가져오는 로직 추가
//     // ex.서버에서 해당 날짜의 투두리스트를 가져오는 API를 호출하거나,
//     // 로컬 스토리지 등을 사용하여 저장된 데이터를 가져오는 방식
    
//     // 아래는 가상의 예시 코드
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/todos?date=${date}`);
//         const data = await response.json();
//         setTodos(data);
//       } catch (error) {
//         console.error('Error fetching todos:', error);
//       }
//     };

//     fetchData();
//   }, [date]);

//   return (
//     <div>
//       <h2>{date}의 To-do List</h2>
//       <TodoList todos={todos} />
//     </div>
//   );
// };

// export default TodoPage;
