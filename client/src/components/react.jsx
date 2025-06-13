import React, { useState } from 'react';
import axios from 'axios';
import "../index.css"; 

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    level: 'Beginner'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://221.140.73.55:3001/api/register", formData);
      console.log("서버 응답:", response.data);
      alert("회원가입 성공!");
    } catch (error) {
      console.error("에러 발생:", error);
      alert("회원가입 실패!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} />
      <input type="text" name="username" placeholder="이름" value={formData.username} onChange={handleChange} />
      <select name="level" value={formData.level} onChange={handleChange}>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      <button type="submit">회원가입</button>
    </form>
  );
}

export default RegisterForm;
