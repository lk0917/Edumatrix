import React, { useState, useEffect } from "react";
import ThemeSelector from "./components/ThemeSelector";
import SidebarMenu from "./components/SidebarMenu";
import ChatbotSidebar from "./components/ChatbotSidebar";
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

  // 테마 적용
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("edumatrix-theme", theme);
  }, [theme]);

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
          <img
            src={icon1}
            alt="AI 챗봇"
            className="chatbot-icon-btn"
          />
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
      </main>
    </div>
  );
}

export default App;
