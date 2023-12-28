// TodoPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const TodoPage = ({ onClose, date }) => {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const daysOfWeekKorean = ['일', '월', '화', '수', '목', '금', '토'];
  const monthsKorean = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  
  const navigate = useNavigate();

  const getKoreanDateInfo = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dayOfWeek = daysOfWeekKorean[currentDate.getDay()];
    const day = currentDate.getDate();

    return `${year}년 ${monthsKorean[month]} ${day}일 (${dayOfWeek})`;
  };

  const handleSaveTodo = () => {
    const newTodo = {
      id: new Date().getTime(),
      text: todoText,
      date: date.toDateString(),
      files: attachedFiles,
    };

    setTodos([...todos, newTodo]);
    setTodoText('');
    setAttachedFiles([]);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleDeleteFile = (fileName) => {
    const updatedFiles = attachedFiles.filter((file) => file.name !== fileName);
    setAttachedFiles(updatedFiles);
  };

  const onDrop = (acceptedFiles) => {
    setAttachedFiles([...attachedFiles, ...acceptedFiles]);
  };

  const handleClose = () => {
    // 이전 페이지로 이동
    navigate(-1);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="modal-overlay">
      <div className="todo-modal">
        <h2>{getKoreanDateInfo()} To-do List</h2>
        <textarea value={todoText} onChange={(e) => setTodoText(e.target.value)} />
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <p>파일을 여기에 끌어 놓거나 클릭하세요.</p>
        </div>
        {attachedFiles.length > 0 && (
          <div>
            <h3>첨부된 파일:</h3>
            <ul>
              {attachedFiles.map((file) => (
                <li key={file.name}>
                  {file.name} ({file.size} bytes)
                  <button onClick={() => handleDeleteFile(file.name)}>파일 삭제</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={handleSaveTodo}>등록</button>
        {/* <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.text}</span>
              <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
            </li>
          ))}
        </ul> */}
        <button onClick={handleClose}>닫기</button>
      </div>
    </div>
  );
};

export default TodoPage;
