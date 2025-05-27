import React, { useState } from "react";
import logo from "../assets/logo.png";

function Login({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !pw) {
      setError("이메일과 비밀번호를 입력하세요.");
      return;
    }
    setError("");
    onLogin(email);
  };

  return (
    <div className="login-root">
      <form className="login-box" onSubmit={handleLogin}>
        <img src={logo} alt="EduMatrix Logo" className="login-logo" />
        <h2>로그인</h2>
        <div className="login-field">
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="이메일 입력"
            autoComplete="email"
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
