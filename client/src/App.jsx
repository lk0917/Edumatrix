import React, { useState, useEffect } from "react";
import SidebarMenu from "./components/SidebarMenu";
import ChatbotSidebar from "./components/ChatbotSidebar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SelectField from "./components/SelectField";
import Recommendation from "./components/Recommendation";
import LevelTest from "./components/LevelTest";
import Dashboard from "./components/Dashboard";
import SettingsPage from "./components/SettingsPage"; // ← 반드시 이 부분 유지!
import LearningRecords from "./components/LearningRecords"; // ← 새로 추가
import "./index.css";
import logo from "./assets/logo.png";
import whiteLogo from "./assets/white logo.png";
import icon1 from "./assets/icon1.png";
import backArrow from "./assets/Arrow left.png";

// 기존 SettingsPage 함수 정의는 삭제 또는 주석처리(중복방지)
// function SettingsPage({ currentTheme, onChangeTheme, onBack, backArrow }) { ... }

// 다크모드 자동 대응 로고 컴포넌트 (import 방식)
function Logo() {
  const [theme, setTheme] = React.useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme"));
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);
  const logoSrc = theme === "dark" ? whiteLogo : logo;
  return <img className="center-logo" src={logoSrc} alt="로고" />;
}

function App() {
  // 테마 관리 (전역)
  const [theme, setTheme] = useState(() => localStorage.getItem("edumatrix-theme") || "light");

  // 사이드바, 챗봇바 상태
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  // 인증/페이지 전환 상태
  const [authView, setAuthView] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fieldSelect, setFieldSelect] = useState(false);
  const [userField, setUserField] = useState(null);
  const [userLevel, setUserLevel] = useState(null);
  const [showRecommend, setShowRecommend] = useState(false);
  const [showLevelTest, setShowLevelTest] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showRecords, setShowRecords] = useState(false); // 학습 기록 추가

  // 마이페이지용 사용자 정보 (실제 서비스 시 API로 대체)
  const [userInfo] = useState({
    username: "testuser",
    name: "홍길동",
    email: "testuser@email.com",
    password: "********"
  });

  // 테마가 바뀔 때마다 html data-theme 동기화
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("edumatrix-theme", theme);
  }, [theme]);

  // 핸들러 함수들
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setAuthView(null);
    setFieldSelect(true);
    setUserField(null);
    setUserLevel(null);
    setShowRecommend(false);
    setShowLevelTest(false);
    setShowDashboard(false);
    setShowSettings(false);
    setShowRecords(false);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthView(null);
    setFieldSelect(false);
    setUserField(null);
    setUserLevel(null);
    setShowRecommend(false);
    setShowLevelTest(false);
    setShowDashboard(false);
    setShowSettings(false);
    setShowRecords(false);
  };
  const handleFieldSelected = (field) => setUserField(field);
  const handleLevelSelected = (field, level) => {
    setUserLevel(level);
    setFieldSelect(false);
    if (level === "Test") {
      setShowLevelTest(true);
      setShowRecommend(false);
      setShowDashboard(false);
      setShowSettings(false);
      setShowRecords(false);
    } else {
      setShowRecommend(true);
      setShowLevelTest(false);
      setShowDashboard(false);
      setShowSettings(false);
      setShowRecords(false);
    }
  };

  // 뒤로가기 핸들러
  const handleBackToHome = () => {
    setFieldSelect(false);
    setIsLoggedIn(false);
    setAuthView(null);
    setShowRecords(false);
  };
  const handleBackToSelect = () => {
    setShowLevelTest(false);
    setFieldSelect(true);
    setUserLevel(null);
    setShowRecords(false);
  };
  const handleBackToSelectFromRecommend = () => {
    setShowRecommend(false);
    setFieldSelect(true);
    setUserLevel(null);
    setShowRecords(false);
  };
  const handleBackToRecommend = () => {
    setShowDashboard(false);
    setShowRecommend(true);
    setShowRecords(false);
  };

  // 사이드바 메뉴 클릭(홈/대시보드/설정 등)
  const handleSidebarMenuClick = (key) => {
    if (key === "dashboard") {
      setShowDashboard(true);
      setShowRecommend(false);
      setShowLevelTest(false);
      setFieldSelect(false);
      setShowSettings(false);
      setShowRecords(false);
    } else if (key === "home") {
      setShowDashboard(false);
      setShowRecommend(false);
      setShowLevelTest(false);
      setFieldSelect(false);
      setShowSettings(false);
      setShowRecords(false);
      setIsLoggedIn(false);
      setAuthView(null);
      setUserField(null);
      setUserLevel(null);
    } else if (key === "settings") {
      setShowSettings(true);
      setShowDashboard(false);
      setShowRecommend(false);
      setShowLevelTest(false);
      setFieldSelect(false);
      setShowRecords(false);
    } else if (key === "records") {
      setShowRecords(true);
      setShowDashboard(false);
      setShowRecommend(false);
      setShowLevelTest(false);
      setFieldSelect(false);
      setShowSettings(false);
    }
    setLeftOpen(false);
  };

  // --- 페이지 분기 렌더링 ---
  if (!isLoggedIn && authView === "login") {
    return (
      <Login onLogin={handleLoginSuccess} onSwitchToSignup={() => setAuthView("signup")} />
    );
  }
  if (!isLoggedIn && authView === "signup") {
    return (
      <Signup
        onSignup={handleLoginSuccess}
        onSwitchToLogin={() => setAuthView("login")}
        onBackToHome={() => setAuthView(null)}
        backArrow={backArrow}
      />
    );
  }

  // 환경설정(마이페이지+테마) 페이지
  if (isLoggedIn && showSettings) {
    return (
      <SettingsPage
        userInfo={userInfo}
        currentTheme={theme}
        onChangeTheme={setTheme}
        onBack={() => setShowSettings(false)}
        backArrow={backArrow}
      />
    );
  }

  // 학습 기록(레코드) 페이지
  if (isLoggedIn && showRecords) {
    return (
      <div className="edumatrix-root">
        <SidebarMenu
          open={leftOpen}
          onClose={() => setLeftOpen(false)}
          onMenuClick={handleSidebarMenuClick}
        />
        <ChatbotSidebar
          open={rightOpen}
          onClose={() => setRightOpen(false)}
        />
        <header className="topbar">
          <button className="sidebar-toggle" onClick={() => setLeftOpen(true)}>
            <span role="img" aria-label="메뉴">☰</span>
          </button>
          <button
            className="back-btn"
            onClick={() => {
              setShowRecords(false);
              setShowDashboard(true); // 뒤로가기 시 대시보드로 이동
            }}
            style={{
              marginLeft: 10,
              background: "none",
              border: "none",
              padding: 0,
              display: "flex",
              alignItems: "center"
            }}
          >
            <img
              src={backArrow}
              alt="뒤로가기"
              style={{ width: 28, height: 28, objectFit: "contain" }}
            />
          </button>
          <h2 style={{ margin: 0, fontSize: "1.3rem", color: "var(--sidebar-title)" }}>학습 기록</h2>
          <div style={{ flex: 1 }} />
          <button className="chatbot-toggle" onClick={() => setRightOpen(true)}>
            <img src={icon1} alt="AI 챗봇" className="chatbot-icon-btn" />
          </button>
        </header>
        <main>
          <LearningRecords
            onBack={() => {
              setShowRecords(false);
              setShowDashboard(true); // 뒤로가기 시 대시보드로 이동
            }}
          />
        </main>
      </div>
    );
  }

  // 분야/레벨 선택
  if (isLoggedIn && fieldSelect) {
    return (
      <div className="edumatrix-root">
        <SidebarMenu
          open={leftOpen}
          onClose={() => setLeftOpen(false)}
          onMenuClick={handleSidebarMenuClick}
        />
        <ChatbotSidebar open={rightOpen} onClose={() => setRightOpen(false)} />
        <header className="topbar">
          <button className="sidebar-toggle" onClick={() => setLeftOpen(true)}>
            <span role="img" aria-label="메뉴">☰</span>
          </button>
          {/* 뒤로가기 화살표 */}
          <button
            className="back-btn"
            onClick={handleBackToHome}
            style={{
              marginLeft: 10,
              background: "none",
              border: "none",
              padding: 0,
              display: "flex",
              alignItems: "center"
            }}
          >
            <img
              src={backArrow}
              alt="뒤로가기"
              style={{ width: 28, height: 28, objectFit: "contain" }}
            />
          </button>
          <div style={{ flex: 1 }} />
          <button className="chatbot-toggle" onClick={() => setRightOpen(true)}>
            <img src={icon1} alt="AI 챗봇" className="chatbot-icon-btn" />
          </button>
        </header>
        <SelectField
          onFieldSelected={handleFieldSelected}
          onLevelSelected={handleLevelSelected}
        />
      </div>
    );
  }

  // 레벨테스트(퀴즈)
  if (isLoggedIn && showLevelTest) {
    return (
      <LevelTest
        field={userField}
        onBack={handleBackToSelect}
        backArrow={backArrow}
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
        onBack={handleBackToSelectFromRecommend}
        backArrow={backArrow}
        onNext={() => {
          setShowRecommend(false);
          setShowDashboard(true);
        }}
      />
    );
  }

  // 학습 대시보드
  if (isLoggedIn && showDashboard) {
    return (
      <div className="edumatrix-root">
        <SidebarMenu
          open={leftOpen}
          onClose={() => setLeftOpen(false)}
          onMenuClick={handleSidebarMenuClick}
        />
        <ChatbotSidebar open={rightOpen} onClose={() => setRightOpen(false)} />
        <header className="topbar">
          <button className="sidebar-toggle" onClick={() => setLeftOpen(true)}>
            <span role="img" aria-label="메뉴">☰</span>
          </button>
          {/* 뒤로가기 */}
          <button
            className="back-btn"
            onClick={handleBackToRecommend}
            style={{
              marginLeft: 10,
              background: "none",
              border: "none",
              padding: 0,
              display: "flex",
              alignItems: "center"
            }}
          >
            <img
              src={backArrow}
              alt="뒤로가기"
              style={{ width: 28, height: 28, objectFit: "contain" }}
            />
          </button>
          <div style={{ flex: 1 }} />
          <button className="chatbot-toggle" onClick={() => setRightOpen(true)}>
            <img src={icon1} alt="AI 챗봇" className="chatbot-icon-btn" />
          </button>
        </header>
        <main className="main-content" style={{ marginTop: "2.3rem" }}>
          <Dashboard />
          <button
            className="login-btn"
            style={{ margin: "2rem auto 0", width: 180, display: "block" }}
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </main>
      </div>
    );
  }

  // 기본 메인 화면
  return (
    <div className="edumatrix-root">
      <SidebarMenu
        open={leftOpen}
        onClose={() => setLeftOpen(false)}
        onMenuClick={handleSidebarMenuClick}
      />
      <ChatbotSidebar open={rightOpen} onClose={() => setRightOpen(false)} />
      <header className="topbar">
        <button className="sidebar-toggle" onClick={() => setLeftOpen(true)}>
          <span role="img" aria-label="메뉴">☰</span>
        </button>
        <div style={{ flex: 1 }} />
        <button className="chatbot-toggle" onClick={() => setRightOpen(true)}>
          <img src={icon1} alt="AI 챗봇" className="chatbot-icon-btn" />
        </button>
      </header>
      <main className="main-content">
        <Logo />
        <div className="main-greeting">
          <h1>EduMatrix에 오신 걸 환영합니다.</h1>
          <p>
            EduMatrix는 AI 기반의 맞춤형 학습을 제공합니다.<br />
            똑똑하고 직관적인 학습 비서와 함께, 성장의 경험을 시작하세요.
          </p>
        </div>
        {/* 로그인/회원가입 버튼 추가 */}
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
      </main>
    </div>
  );
}

export default App;
