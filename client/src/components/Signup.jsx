import React, { useState } from "react";
import logo from "../assets/logo.png";
import "../index.css";
import axios from "axios";
// axios주석 삭제금지

// onBackToHome, backArrow prop 추가 필요!
function Signup({ onSignup, onSwitchToLogin, onBackToHome, backArrow }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !name || !email || !pw || !pw2 || !gender || !birth || !phone) {
      setError("모든 항목을 입력하세요.");
      return;
    }
    if (pw !== pw2) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!/^\d{6}$/.test(birth)) {
      setError("생년월일은 YYMMDD 형식의 숫자 6자리로 입력하세요.");
      return;
    }
    if (!/^\d{10,11}$/.test(phone.replace(/-/g, ""))) {
      setError("전화번호는 숫자만 10~11자리로 입력하세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        username,
        name,
        email,
        password: pw,
        gender,
        birth,
        phone
      });

      if (response.data.success) {
        // 회원가입 성공시 isNewUser: true 추가 전달
        onSignup({
          user_id: response.data.user_id,
          username,
          name,
          email,
          isNewUser: true // << 이 줄만 추가됨!
        });
      }
      else {
        setError("회원가입에 실패했습니다. 다시 시도해주세요. err,404");
      }
    } catch (err) {
      console.error("회원가입 오류:", err);
      setError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요. err,404");
    }
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
          <label>아이디</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="아이디 입력"
            autoComplete="username"
          />
        </div>
        <div className="login-field">
          <label>이름</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="이름 입력"
            autoComplete="name"
          />
        </div>
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
          <label style={{ display: "block", marginBottom: "0.5rem" }}>성별</label>
          <div style={{ display: "flex", flexDirection: "row", gap: "2rem", alignItems: "center" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 400 }}>
              <input
                type="radio"
                name="gender"
                value="남성"
                checked={gender === "남성"}
                onChange={() => setGender("남성")}
              />
              남성
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 400 }}>
              <input
                type="radio"
                name="gender"
                value="여성"
                checked={gender === "여성"}
                onChange={() => setGender("여성")}
              />
              여성
            </label>
          </div>
        </div>

        <div className="login-field">
          <label>생년월일 (YYMMDD)</label>
          <input
            type="text"
            value={birth}
            onChange={e => setBirth(e.target.value)}
            placeholder="예: 990101"
            autoComplete="bday"
            maxLength={6}
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
            maxLength={11}
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
