import React, { useState } from "react";
import logo from "../assets/logo.png";
import "../index.css"; 
import axios from "axios";

function Login({ onLogin, onSwitchToSignup }) {
  const [idOrEmail, setIdOrEmail] = useState(""); // 아이디 또는 이메일
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!idOrEmail || !pw) {
            setError("이메일과 비밀번호를 입력하세요.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3001/api/login", { //db주소의 맞게 변경할것.
                idOrEmail,
                password: pw
            });
            localStorage.setItem("user_id", response.data.user.user_id);
            const userData = response.data.user;
            setError("");
            onLogin(userData);
        }
        catch (err) {
            console.error("로그인 실패:", err);
            setError(err.response?.data?.message || "로그인실패");

        }
    };

  return (
    <div className="login-root">
      <form className="login-box" onSubmit={handleLogin}>
        <img src={logo} alt="EduMatrix Logo" className="login-logo" />
        <h2>로그인</h2>
        <div className="login-field">
          <label>아이디 또는 이메일</label>
          <input
            type="text"
            value={idOrEmail}
            onChange={e => setIdOrEmail(e.target.value)}
            placeholder="아이디 또는 이메일 입력"
            autoComplete="username"
          />
        </div>
        <div className="login-field">
          <label>비밀번호</label>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="비밀번호 입력"
            autoComplete="current-password"
          />
        </div>
        {error && <div className="login-error">{error}</div>}
        <button className="login-btn" type="submit">로그인</button>
        <div className="login-footer">
          계정이 없으신가요?{" "}
          <button type="button" className="link-btn" onClick={onSwitchToSignup}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
