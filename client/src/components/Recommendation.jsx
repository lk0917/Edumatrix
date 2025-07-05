import React, { useState, useEffect, useMemo } from "react";
import SidebarMenu from "./SidebarMenu";
import ChatbotSidebar from "./ChatbotSidebar";
import "../index.css";
import icon1 from "../assets/icon1.png";
import backArrow from "../assets/Arrow left.png";

// 시간 포맷 유틸
function getTimeString(date) {
  return new Date(date).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

// 분야 필드명(영어/코딩 등)을 추천 카테고리 이름(언어/프로그래밍 등)으로 변환
function fieldToCategory(field) {
  if (!field) return "전체";
  if (field === "english" || field === "영어") return "영어";
  if (field === "programming" || field === "코딩" || field === "프로그래밍") return "프로그래밍";
  return "기타";
}

function Recommendation({ onMenuClick, field, onBack, backArrow: propBackArrow }) {
  // ---- 사이드바/챗봇 상태 선언 (필수!!) ----
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  // 추천 데이터 상태
  const [recommendations, setRecommendations] = useState([]);
  // field를 받아서 카테고리 기본값 설정
  const initialCategory = useMemo(() => fieldToCategory(field), [field]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showDetail, setShowDetail] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  // 카테고리 목록(선택 분야가 맨 앞에 오도록)
  const allCategories = useMemo(() => {
    // 항상 "전체" 포함, 분야가 있을 경우 맨 앞, 그다음 고정된 나머지 카테고리
    const base = ["프로그래밍",  "영어" , "기타"];
    const mainCat = fieldToCategory(field);
    const arr = ["전체"];
    if (mainCat && mainCat !== "전체") arr.push(mainCat);
    arr.push(...base.filter(cat => cat !== mainCat));
    // 중복 방지
    return [...new Set(arr)];
  }, [field]);

  // defaultRecs를 useMemo로 고정 (ESLint 경고 해결)
  const defaultRecs = useMemo(() => [
    {
      id: 1,
      title: "파이썬 기초 완성하기",
      subject: "프로그래밍",
      category: "프로그래밍",
      summary: "파이썬 기본 문법과 데이터 구조를 학습하여 프로그래밍 기초를 다집니다.",
      time: "주 5시간",
      difficulty: "초급",
      duration: "4주",
      plan: [
        { label: "기초 문법", days: ["월", "화", "수"], time: "2시간" },
        { label: "실습 문제", days: ["목", "금"], time: "2시간" },
        { label: "복습 및 정리", days: ["토"], time: "1시간" },
      ],
      reason: "최근 프로그래밍에 대한 관심도가 높아지고 있으며, 파이썬은 입문자에게 적합한 언어입니다.",
      progress: 0,
      goals: 3,
      due: "2024-06-15",
      tags: ["초급", "실습중심", "4주완성"],
      createdAt: getTimeString(new Date()),
    },
    {
      id: 2,
      title: "영어 토익 준비",
      subject: "영어",
      category: "영어",
      summary: "토익 시험을 대비하여 영어 실력을 체계적으로 향상시킵니다.",
      time: "주 4시간",
      difficulty: "중급",
      duration: "8주",
      plan: [
        { label: "문법 학습", days: ["월", "화"], time: "2시간" },
        { label: "듣기 연습", days: ["수"], time: "1시간" },
        { label: "독해 연습", days: ["목"], time: "1시간" },
      ],
      reason: "취업 준비를 위해 토익 점수 향상이 필요하며, 체계적인 학습 계획이 도움이 될 것입니다.",
      progress: 0,
      goals: 5,
      due: "2024-08-10",
      tags: ["중급", "시험준비", "8주완성"],
      createdAt: getTimeString(new Date()),
    },
  ], []);

  // 분야가 바뀔 때마다 카테고리 초기화
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setRecommendations(defaultRecs);
  }, [defaultRecs]);

  // 현재 카테고리의 추천 목록만
  const filteredRecommendations = recommendations.filter((rec) =>
    selectedCategory === "전체" || rec.category === selectedCategory
  );

  // 추천 수락 처리
  const handleAccept = (recommendation) => {
    setSelectedRecommendation(recommendation);
    setShowAcceptModal(true);
  };

  // 추천 수락 확인
  const confirmAccept = () => {
    // 여기에 실제 수락 로직 추가
    alert(`${selectedRecommendation.title} 추천을 수락했습니다!`);
    setShowAcceptModal(false);
    setSelectedRecommendation(null);
  };

  // 진행률 표시 컴포넌트
  const ProgressBar = ({ progress }) => (
    <div style={{
      width: "100%",
      height: 8,
      backgroundColor: "var(--input-border)",
      borderRadius: 4,
      overflow: "hidden",
      marginTop: 8,
    }}>
      <div style={{
        width: `${progress}%`,
        height: "100%",
        background: "linear-gradient(90deg, var(--button-bg) 0%, #6b8bd4 100%)",
        borderRadius: 4,
        transition: "width 0.3s ease",
      }} />
    </div>
  );

  // 태그 컴포넌트
  const Tag = ({ children }) => (
    <span style={{
      background: "var(--button-alt-bg)",
      color: "var(--sidebar-title)",
      padding: "0.2em 0.6em",
      borderRadius: 12,
      fontSize: "0.8rem",
      fontWeight: 500,
      marginRight: 6,
      marginBottom: 6,
      display: "inline-block",
    }}>
      {children}
    </span>
  );

  // 실제로 부모로부터 받은 onMenuClick 콜백을 SidebarMenu에 전달해야 한다!
  const handleSidebarMenuClick = (key) => {
    setLeftOpen(false); // 메뉴 닫기
    if (onMenuClick) onMenuClick(key); // 반드시 부모(App)의 상태 변경!
  };

  return (
    <div className="edumatrix-root" style={{ color: "var(--text)", background: "var(--bg)", minHeight: "100vh" }}>
      {/* ===== 상단 네비/메뉴/챗봇 버튼(고정) ===== */}
      <header className="topbar">
        <button className="sidebar-toggle" onClick={() => setLeftOpen(true)}>
          <span role="img" aria-label="메뉴">☰</span>
        </button>
        {/* 뒤로가기(있을 경우) */}
        {onBack && (
          <button
            className="back-btn"
            onClick={onBack}
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
              src={propBackArrow || backArrow}
              alt="뒤로가기"
              style={{ width: 28, height: 28, objectFit: "contain" }}
            />
          </button>
        )}
        <div style={{ flex: 1 }} />
        <button className="chatbot-toggle" onClick={() => setRightOpen(true)}>
          <img src={icon1} alt="AI 챗봇" className="chatbot-icon-btn" />
        </button>
      </header>

      {/* ===== 사이드/챗봇 ===== */}
      <SidebarMenu
        open={leftOpen}
        onClose={() => setLeftOpen(false)}
        onMenuClick={handleSidebarMenuClick} // 여기서 반드시 부모 콜백으로!
      />
      <ChatbotSidebar open={rightOpen} onClose={() => setRightOpen(false)} />

      {/* ===== 네비게이션 바 (카테고리) ===== */}
      <nav
        style={{
          width: "100vw",
          background: "var(--sidebar-bg)",
          borderBottom: "1.2px solid var(--input-border)",
          position: "sticky",
          top: 0,
          zIndex: 5,
          padding: "0.5rem 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "var(--sidebar-title)",
            maxWidth: 540,
            margin: "0 auto",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          {allCategories.map((cat) => (
            <button
              key={cat}
              style={{
                background:
                  selectedCategory === cat
                    ? "var(--button-bg)"
                    : "var(--button-alt-bg, #f3f5fa)",
                color:
                  selectedCategory === cat
                    ? "var(--button-text)"
                    : "var(--sidebar-title, #444)",
                border: "none",
                borderRadius: 8,
                padding: "0.5em 1.15em",
                fontWeight: 600,
                fontSize: "1.01rem",
                cursor: "pointer",
                marginRight: 2,
              }}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* ===== 추천 목록 ===== */}
      <main style={{ margin: "0 auto", maxWidth: 540, padding: "1.4rem 1rem" }}>
        {filteredRecommendations.length === 0 ? (
          <div style={{ textAlign: "center", color: "var(--sidebar-title)", marginTop: 60 }}>
            {selectedCategory} 카테고리에 추천이 없습니다.<br />
            다른 카테고리를 선택하거나 새 추천을 요청해보세요.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filteredRecommendations.map((rec) => (
              <div
                key={rec.id}
                style={{
                  background: "var(--card-bg)",
                  borderRadius: 13,
                  boxShadow: "var(--card-shadow)",
                  padding: "1.4rem",
                  cursor: "pointer",
                  transition: "box-shadow 0.15s, transform 0.15s",
                  color: "var(--text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "var(--card-shadow)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onClick={() => setShowDetail(rec)}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 12,
                }}>
                  <div style={{
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "var(--text)",
                    flex: 1,
                  }}>
                    {rec.title}
                  </div>
                  <span style={{
                    background: rec.difficulty === "초급" ? "#e8f5e8" : 
                              rec.difficulty === "중급" ? "#fff3cd" : "#ffe6e6",
                    color: rec.difficulty === "초급" ? "#2d5a2d" : 
                           rec.difficulty === "중급" ? "#856404" : "#721c24",
                    padding: "0.2em 0.6em",
                    borderRadius: 12,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}>
                    {rec.difficulty}
                  </span>
                </div>
                <div style={{
                  fontSize: "0.95rem",
                  color: "var(--sidebar-title)",
                  marginBottom: 12,
                  lineHeight: 1.4,
                }}>
                  {rec.summary}
                </div>
                <div style={{
                  display: "flex",
                  gap: 16,
                  marginBottom: 12,
                  fontSize: "0.9rem",
                  color: "var(--sidebar-title)",
                }}>
                  <span>⏱{rec.time}</span>
                  <span>{rec.duration}</span>
                  <span>목표 {rec.goals}개</span>
                </div>
                <div style={{ marginBottom: 12 }}>
                  {rec.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: "0.9rem",
                      color: "var(--sidebar-title)",
                      marginBottom: 4,
                    }}>
                      진행률: {rec.progress}%
                    </div>
                    <ProgressBar progress={rec.progress} />
                  </div>
                  <button
                    style={{
                      background: "var(--button-bg)",
                      color: "var(--button-text)",
                      border: "none",
                      borderRadius: 8,
                      padding: "0.5em 1.2em",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      marginLeft: 16,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAccept(rec);
                    }}
                  >
                    수락하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ===== 추천 상세보기/수락모달 등 기존 코드 동일 ===== */}
      {showDetail && (
        <div
          style={{
            background: "rgba(16,24,31,0.22)",
            position: "fixed",
            inset: 0,
            zIndex: 99,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowDetail(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
              borderRadius: 14,
              padding: "2.4rem 2.1rem",
              width: 800,
              maxWidth: "96vw",
              maxHeight: "90vh",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              position: "relative",
              color: "var(--text)",
            }}
          >
            <div style={{ fontWeight: 800, fontSize: "1.4rem" }}>
              {showDetail.title}
            </div>
            <div style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              fontSize: "1rem",
              color: "var(--sidebar-title)",
            }}>
              <span>{showDetail.subject}</span>
              <span>⏱{showDetail.time}</span>
              <span>{showDetail.duration}</span>
              <span>목표 {showDetail.goals}개</span>
              <span>완료 예정: {showDetail.due}</span>
            </div>
            <div style={{
              background: "var(--input-bg)",
              padding: "1.2rem",
              borderRadius: 10,
              border: "1px solid var(--input-border)",
            }}>
              <div style={{ fontWeight: 600, marginBottom: 8, color: "var(--text)" }}>
                📋 학습 계획
              </div>
              {showDetail.plan.map((item, index) => (
                <div key={index} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem 0",
                  borderBottom: index < showDetail.plan.length - 1 ? "1px solid var(--input-border)" : "none",
                }}>
                  <div style={{ color: "var(--text)" }}>
                    <strong>{item.label}</strong>
                    <div style={{ fontSize: "0.9rem", color: "var(--sidebar-title)" }}>
                      {item.days.join(", ")} • {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              background: "var(--input-bg)",
              padding: "1.2rem",
              borderRadius: 10,
              border: "1px solid var(--input-border)",
            }}>
              <div style={{ fontWeight: 600, marginBottom: 8, color: "var(--text)" }}>
                AI 추천 이유
              </div>
              <div style={{ color: "var(--text)", lineHeight: 1.5 }}>
                {showDetail.reason}
              </div>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: "0.9rem",
                  color: "var(--sidebar-title)",
                  marginBottom: 4,
                }}>
                  진행률: {showDetail.progress}%
                </div>
                <ProgressBar progress={showDetail.progress} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  style={{
                    background: "#f6e1e1",
                    color: "#e44747",
                    borderRadius: 7,
                    padding: "0.5em 1.2em",
                    border: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowDetail(null)}
                >
                  거절
                </button>
                <button
                  style={{
                    background: "var(--button-bg)",
                    color: "var(--button-text)",
                    borderRadius: 7,
                    padding: "0.5em 1.2em",
                    border: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setShowDetail(null);
                    handleAccept(showDetail);
                  }}
                >
                  수락하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== 수락 확인 모달 ===== */}
      {showAcceptModal && selectedRecommendation && (
        <div
          style={{
            background: "rgba(16,24,31,0.22)",
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowAcceptModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
              borderRadius: 14,
              padding: "2rem",
              width: 400,
              maxWidth: "90vw",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              color: "var(--text)",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: "1.2rem", textAlign: "center" }}>
              추천 수락 확인
            </div>
            <div style={{ textAlign: "center", color: "var(--sidebar-title)" }}>
              <strong>{selectedRecommendation.title}</strong> 추천을 수락하시겠습니까?
              <br />
              이 추천이 학습 일정에 추가됩니다.
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button
                style={{
                  background: "#f0f1f5",
                  color: "#334",
                  borderRadius: 7,
                  padding: "0.5em 1.2em",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => setShowAcceptModal(false)}
              >
                취소
              </button>
              <button
                style={{
                  background: "var(--button-bg)",
                  color: "var(--button-text)",
                  borderRadius: 7,
                  padding: "0.5em 1.2em",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                onClick={confirmAccept}
              >
                수락
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendation;
