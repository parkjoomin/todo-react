import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  // const [csrfToken, setCSRFToken] = useState('');

  // useEffect(() => {
  //   const fetchCSRFToken = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/account/api/get-csrf-token/');
  //       const csrfToken = response.data.csrfToken;
  //       setCSRFToken(csrfToken);
  //     } catch (error) {
  //       console.error('API 호출 중 오류:', error);
  //     }
  //   };

  //   fetchCSRFToken();
  // }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/account/api/signup/',
        {
          id: id,
          password: password,
          name: name,
        },
        // {
        //   headers: {
        //     'X-CSRFToken': csrfToken,
        //     'Content-Type': 'application/json',
        //   },
        //   withCredentials: true,
        // }
      );

      const data = response.data;

      if (data.success) {
        console.log('회원가입 성공');
        navigate('/');
      } else {
        console.error('회원가입 실패:', data.message);
      }
    } catch (error) {
      console.error('API 호출 중 오류:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
