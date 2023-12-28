import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [csrfToken, setCSRFToken] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchCSRFToken = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/account/api/get-csrf-token/');
  //       const csrfToken = response.data.csrf_token;
  //       setCSRFToken(csrfToken);
  //     } catch (error) {
  //       console.error('API 호출 중 오류:', error);
  //     }
  //   };

  //   fetchCSRFToken();
  // }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/account/api/login/', {
        id: id,
        password: password,
      }, {
        // headers: {
        //   'X-CSRFToken': csrfToken,
        //   'Content-Type': 'application/json',
        // },
      });

      // 로그인이 성공하면 다음 동작 수행
      if(response.data.success) {
        console.log('Login success:', response.data);

        navigate('/calendar');
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          아이디:
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <br />
        <label>
          비밀번호:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">로그인</button>
        <button type="submit" onClick={() => navigate('/signup')}>회원가입</button>

      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
