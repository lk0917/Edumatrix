import React, { useState, useEffect } from "react";
import ThemeSelector from "./components/ThemeSelector";
import SidebarMenu from "./components/SidebarMenu";
import ChatbotSidebar from "./components/ChatbotSidebar";
import Login from "./components/Login";     // 로그인
import Signup from "./components/Signup";   // 회원가입
import SelectField from "./components/SelectField"; // 분야 선택
import Recommendation from "./components/Recommendation"; // 학습 추천
import LevelTest from "./components/LevelTest";           // 레벨 테스트
import "./index.css";
import logo from "./assets/logo.png";
import icon1 from "./assets/icon1.png";

function App() {
  // 테마 관리
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("edumatrix-theme") || "light";
  });

  // 사이드바 상태
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  // 인증/분야/레벨 관련 상태
  const [authView, setAuthView] = useState(null); // "login", "signup", null
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [fieldSelect, setFieldSelect] = useState(false); // 분야 선택 중
  const [userField, setUserField] = useState(null);      // 분야 저장
  const [userLevel, setUserLevel] = useState(null);      // 레벨 저장

  const [showRecommend, setShowRecommend] = useState(false); // 추천화면
  const [showLevelTest, setShowLevelTest] = useState(false); // 레벨테스트

  // 테마 적용
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("edumatrix-theme", theme);
  }, [theme]);

  // 로그인 성공 시 분야선택으로
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setAuthView(null);
    setFieldSelect(true); // 분야선택 활성화
    setUserField(null);
    setUserLevel(null);
    setShowRecommend(false);
    setShowLevelTest(false);
  };

  // 로그아웃
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthView(null);
    setFieldSelect(false);
    setUserField(null);
    setUserLevel(null);
    setShowRecommend(false);
    setShowLevelTest(false);
  };

  // 분야 선택
  const handleFieldSelected = (field) => {
    setUserField(field);
    // 그대로 유지, 레벨은 SelectField 내부에서 선택됨
  };

  // 레벨 선택 (Beginner, Intermediate, Advance, Test)
  const handleLevelSelected = (field, level) => {
    setUserLevel(level);
    setFieldSelect(false);

    if (level === "Test") {
      setShowLevelTest(true);
      setShowRecommend(false);
    } else {
      setShowRecommend(true);
      setShowLevelTest(false);
    }
  };

  // 인증(로그인/회원가입) 화면 분기
  if (!isLoggedIn && authView === "login") {
    return (
      <Login
        onLogin={handleLoginSuccess}
        onSwitchToSignup={() => setAuthView("signup")}
      />
    );
  }
  if (!isLoggedIn && authView === "signup") {
    return (
      <Signup
        onSignup={handleLoginSuccess}
        onSwitchToLogin={() => setAuthView("login")}
      />
    );
  }

  // 로그인된 상태에서 분야/레벨 선택
  if (isLoggedIn && fieldSelect) {
    return (
      <SelectField
        onFieldSelected={handleFieldSelected}
        onLevelSelected={handleLevelSelected}
      />
    );
  }

  // 레벨테스트(퀴즈) 화면
  if (isLoggedIn && showLevelTest) {
    return (
      <LevelTest
        field={userField}
        onBack={() => {
          setShowLevelTest(false);
          setFieldSelect(true); // 다시 분야/레벨 선택
        }}
        onComplete={(level) => {
          setShowLevelTest(false);
          setUserLevel(level);
          setShowRecommend(true);
        }}
      />
    );
  }

  // 추천화면
  if (isLoggedIn && showRecommend) {
    return (
      <Recommendation
        field={userField}
        level={userLevel}
        onBack={() => {
          setShowRecommend(false);
          setFieldSelect(true);
          setUserLevel(null);
        }}
      />
    );
  }

  // 기본 메인 화면
  return (
    <div className="edumatrix-root">
      {/* 좌측 사이드바 */}
      <SidebarMenu open={leftOpen} onClose={() => setLeftOpen(false)} />

      {/* 우측 AI 챗봇 */}
      <ChatbotSidebar open={rightOpen} onClose={() => setRightOpen(false)} />

      {/* 상단바 */}
      <header className="topbar">
        <button className="sidebar-toggle" onClick={() => setLeftOpen(true)}>
          <span role="img" aria-label="메뉴">☰</span>
        </button>
        <div style={{ flex: 1 }} />
        <button className="chatbot-toggle" onClick={() => setRightOpen(true)}>
          <img src={icon1} alt="AI 챗봇" className="chatbot-icon-btn" />
        </button>
      </header>

      {/* 메인 컨텐츠 (중앙 정렬) */}
      <main className="main-content">
        <img src={logo} alt="EduMatrix Logo" className="center-logo" />
        <div className="main-greeting">
          <h1>EduMatrix에 오신 걸 환영합니다.</h1>
          <p>
            EduMatrix는 AI 기반의 맞춤형 학습을 제공합니다.<br />
            똑똑하고 직관적인 학습 비서와 함께, 성장의 경험을 시작하세요.
          </p>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <ThemeSelector current={theme} onChange={setTheme} />
        </div>
        {/* 로그인/회원가입 버튼  */}
        {!isLoggedIn && (
          <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
            <button
              className="login-btn"
              style={{ width: 120 }}
              onClick={() => setAuthView("login")}
            >
              로그인
            </button>
            <button
              className="login-btn"
              style={{
                width: 120,
                background: "#eee",
                color: "#222",
                border: "1.2px solid #c7c7c7"
              }}
              onClick={() => setAuthView("signup")}
            >
              회원가입
            </button>
          </div>
        )}
        {/* 로그인된 상태라면 로그아웃 버튼 */}
        {isLoggedIn && (
          <button
            className="login-btn"
            style={{ margin: "2rem auto 0", width: 180, display: "block" }}
            onClick={handleLogout}
          >
            로그아웃
          </button>
        )}
      </main>
    </div>
  );
}

export default App;