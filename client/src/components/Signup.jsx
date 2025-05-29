import React, { useState } from "react";
import logo from "../assets/logo.png";

function Signup({ onSignup, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !pw || !pw2) {
      setError("모든 항목을 입력하세요.");
      return;
    }
    if (pw !== pw2) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setError("");
    onSignup(email);
  };

  return (
    <div className="login-root">
      <form className="login-box" onSubmit={handleSignup}>
        <img src={logo} alt="EduMatrix Logo" className="login-logo" />
        <h2>회원가입</h2>
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
            autoComplete="new-password"
          />
        </div>
        <div className="login-field">
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={pw2}
            onChange={e => setPw2(e.target.value)}
            placeholder="비밀번호 재입력"
            autoComplete="new-password"
          />
        </div>
        {error && <div className="login-error">{error}</div>}
        <button className="login-btn" type="submit">회원가입</button>
        <div className="login-footer">
          이미 계정이 있으신가요?{" "}
          <button type="button" className="link-btn" onClick={onSwitchToLogin}>
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
