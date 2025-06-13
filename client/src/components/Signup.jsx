import React, { useState } from "react";
import logo from "../assets/logo.png";
import "../index.css"; 

// onBackToHome, backArrow prop 추가 필요!
function Signup({ onSignup, onSwitchToLogin, onBackToHome, backArrow }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !pw || !pw2 || !gender || !birth || !phone) {
      setError("모든 항목을 입력하세요.");
      return;
    }
    if (pw !== pw2) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 추가 유효성 검사 예시 (생년월일 8자리, 전화번호)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birth)) {
      setError("생년월일은 YYYY-MM-DD 형식으로 입력하세요.");
      return;
    }
    if (!/^\d{10,11}$/.test(phone.replace(/-/g, ""))) {
      setError("전화번호는 숫자만 10~11자리로 입력하세요.");
      return;
    }
    setError("");
    // 회원가입 정보 객체로 전달
    onSignup({
      email,
      password: pw,
      gender,
      birth,
      phone
    });
  };

  return (
    <div className="login-root" style={{ position: "relative" }}>
      {/* 상단 뒤로가기 버튼 */}
      {onBackToHome && backArrow && (
        <button
          className="back-btn"
          type="button"
          onClick={onBackToHome}
          style={{
            position: "absolute",
            top: 28,
            left: 26,
            background: "none",
            border: "none",
            padding: 0,
            display: "flex",
            alignItems: "center",
            zIndex: 10
          }}
        >
          <img src={backArrow} alt="뒤로가기" style={{ width: 28, height: 28, objectFit: "contain" }} />
        </button>
      )}

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
        <div className="login-field">
          <label>성별</label>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <label style={{ fontWeight: 400 }}>
              <input
                type="radio"
                name="gender"
                value="남성"
                checked={gender === "남성"}
                onChange={() => setGender("남성")}
                style={{ marginRight: 6 }}
              />
              남성
            </label>
            <label style={{ fontWeight: 400 }}>
              <input
                type="radio"
                name="gender"
                value="여성"
                checked={gender === "여성"}
                onChange={() => setGender("여성")}
                style={{ marginRight: 6 }}
              />
              여성
            </label>
          </div>
        </div>
        <div className="login-field">
          <label>생년월일</label>
          <input
            type="date"
            value={birth}
            onChange={e => setBirth(e.target.value)}
            placeholder="YYYY-MM-DD"
            autoComplete="bday"
          />
        </div>
        <div className="login-field">
          <label>전화번호</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="숫자만 입력 (예: 01012345678)"
            autoComplete="tel"
            maxLength={13}
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
