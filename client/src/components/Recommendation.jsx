import React, { useState, useMemo } from "react";
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
  if (typeof field === "object" && field.field === "programming") return "프로그래밍";
  if (field === "english" || field === "영어") return "영어";
  if (field === "programming" || field === "코딩" || field === "프로그래밍") return "프로그래밍";
  return "기타";
}

// 등급별 추천 항목 데이터
const levelRecs = {
  beginner: [
    // ... 기존 예시
    {
      id: 101,
      title: "영어 알파벳부터 시작",
      subject: "영어",
      category: "영어",
      level: "beginner",
      summary: "알파벳부터 차근차근 배우는 왕초보 영어 과정입니다.",
      time: "주 2시간",
      difficulty: "초급",
      duration: "2주",
      plan: [
        { label: "알파벳 익히기", days: ["월", "화"], time: "1시간" },
        { label: "기초 단어 따라 쓰기", days: ["목"], time: "1시간" },
      ],
      reason: "기초부터 배우고 싶은 분을 위한 입문 강의입니다.",
      progress: 0,
      goals: 2,
      due: "2024-08-01",
      tags: ["왕초보", "기초"],
      createdAt: getTimeString(new Date()),
    },
    {
      id: 102,
      title: "파이썬 완전 처음",
      subject: "프로그래밍",
      category: "프로그래밍",
      level: "beginner",
      summary: "코딩 경험이 없어도 따라하는 파이썬 기초 튜토리얼입니다.",
      time: "주 3시간",
      difficulty: "초급",
      duration: "3주",
      plan: [
        { label: "변수와 출력", days: ["월", "수"], time: "1시간" },
        { label: "자료형과 리스트", days: ["금"], time: "1시간" },
      ],
      reason: "프로그래밍 첫 시작자에게 적합합니다.",
      progress: 0,
      goals: 3,
      due: "2024-08-10",
      tags: ["입문", "실습중심"],
      createdAt: getTimeString(new Date()),
    },
  ],
  intermediate: [
    {
      id: 201,
      title: "영어 토익 준비",
      subject: "영어",
      category: "영어",
      level: "intermediate",
      summary: "토익 시험을 대비하여 영어 실력을 체계적으로 향상시킵니다.",
      time: "주 4시간",
      difficulty: "중급",
      duration: "8주",
      plan: [
        { label: "문법 학습", days: ["월", "화"], time: "2시간" },
        { label: "듣기 연습", days: ["수"], time: "1시간" },
        { label: "독해 연습", days: ["목"], time: "1시간" },
      ],
      reason: "취업 준비를 위해 토익 점수 향상이 필요합니다.",
      progress: 0,
      goals: 5,
      due: "2024-08-20",
      tags: ["중급", "시험준비", "8주완성"],
      createdAt: getTimeString(new Date()),
    },
    {
      id: 202,
      title: "파이썬 기초 완성하기",
      subject: "프로그래밍",
      category: "프로그래밍",
      level: "intermediate",
      summary: "파이썬 기본 문법과 데이터 구조를 학습하여 프로그래밍 기초를 다집니다.",
      time: "주 5시간",
      difficulty: "초급",
      duration: "4주",
      plan: [
        { label: "기초 문법", days: ["월", "화", "수"], time: "2시간" },
        { label: "실습 문제", days: ["목", "금"], time: "2시간" },
        { label: "복습 및 정리", days: ["토"], time: "1시간" },
      ],
      reason: "최근 프로그래밍에 대한 관심도가 높아지고 있습니다.",
      progress: 0,
      goals: 3,
      due: "2024-09-01",
      tags: ["초급", "실습중심", "4주완성"],
      createdAt: getTimeString(new Date()),
    },
  ],
  advanced: [
    {
      id: 301,
      title: "비즈니스 영어 발표 마스터",
      subject: "영어",
      category: "영어",
      level: "advanced",
      summary: "프레젠테이션 및 비즈니스 상황에서 바로 쓰는 실전 영어 과정입니다.",
      time: "주 6시간",
      difficulty: "고급",
      duration: "5주",
      plan: [
        { label: "비즈니스 표현", days: ["월", "수"], time: "2시간" },
        { label: "발표 실습", days: ["금"], time: "2시간" },
      ],
      reason: "비즈니스 실무에 영어를 바로 활용하고자 하는 분에게 추천합니다.",
      progress: 0,
      goals: 4,
      due: "2024-08-30",
      tags: ["고급", "실전"],
      createdAt: getTimeString(new Date()),
    },
    {
      id: 302,
      title: "AI 프로젝트 개발 실전",
      subject: "프로그래밍",
      category: "프로그래밍",
      level: "advanced",
      summary: "AI(머신러닝) 프로젝트를 직접 설계하고 구현하는 심화 과정입니다.",
      time: "주 8시간",
      difficulty: "고급",
      duration: "6주",
      plan: [
        { label: "데이터 분석/전처리", days: ["월", "화"], time: "2시간" },
        { label: "모델 설계/구현", days: ["목", "금"], time: "2시간" },
        { label: "최적화 및 발표", days: ["토"], time: "2시간" },
      ],
      reason: "코딩 실력이 상급인 분을 위한 고급 프로젝트 실습 과정입니다.",
      progress: 0,
      goals: 5,
      due: "2024-09-10",
      tags: ["고급", "AI", "실전"],
      createdAt: getTimeString(new Date()),
    },
  ]
};

function Recommendation({ onMenuClick, field, level, onBack, backArrow: propBackArrow }) {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const initialCategory = useMemo(() => fieldToCategory(field), [field]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showDetail, setShowDetail] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  // === 진행중(수락된) 학습 일정 ===
  const [acceptedSchedules, setAcceptedSchedules] = useState([]);
  const [showSchedulesModal, setShowSchedulesModal] = useState(false);

  // 등급, 분야에 해당하는 추천 데이터
  const recommendations = useMemo(() => {
    const safeLevel = levelRecs[level] ? level : "intermediate";
    return (levelRecs[safeLevel] || []).filter(
      (rec) => rec.category === fieldToCategory(field)
    );
  }, [level, field]);

  // 선택된 분야만 카테고리로 표시
  const allCategories = useMemo(() => {
    const mainCat = fieldToCategory(field);
    return mainCat ? [mainCat] : ["전체"];
  }, [field]);

  // 선택된 카테고리의 추천만 필터링
  const filteredRecommendations = useMemo(() => {
    const mainCat = fieldToCategory(field);
    return recommendations.filter((rec) => rec.category === selectedCategory && rec.category === mainCat);
  }, [recommendations, selectedCategory, field]);

  const handleAccept = (recommendation) => {
    setSelectedRecommendation(recommendation);
    setShowAcceptModal(true);
  };

  // === [수락 시 진행중 일정에 추가] ===
  const confirmAccept = () => {
    if (selectedRecommendation) {
      setAcceptedSchedules((prev) =>
        prev.some((item) => item.id === selectedRecommendation.id)
          ? prev
          : [...prev, selectedRecommendation]
      );
    }
    setShowAcceptModal(false);
    setSelectedRecommendation(null);
  };

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

  const handleSidebarMenuClick = (key) => {
    setLeftOpen(false);
    if (onMenuClick) onMenuClick(key);
  };

  // === [내 학습 일정 모달 컴포넌트] ===
  const renderSchedulesModal = () => (
    <div
      style={{
        background: "rgba(16,24,31,0.16)",
        position: "fixed",
        inset: 0,
        zIndex: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => setShowSchedulesModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--card-bg)",
          borderRadius: 18,
          boxShadow: "var(--card-shadow)",
          width: 560,
          maxWidth: "92vw",
          maxHeight: "90vh",
          padding: "2rem 2rem 1.6rem 2rem",
          overflow: "auto"
        }}
      >
        <h3 style={{ margin: 0, marginBottom: 18, color: "var(--sidebar-title)" }}>진행중 학습 일정</h3>
        {acceptedSchedules.length === 0 ? (
          <div style={{ color: "#888", textAlign: "center", padding: "2.2rem 0" }}>
            아직 수락한 학습 일정이 없습니다.<br />
            <span style={{ fontSize: "0.93rem" }}>추천에서 [수락하기]를 눌러 일정에 추가하세요.</span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {acceptedSchedules.map((item) => (
              <div key={item.id} style={{
                background: "var(--input-bg)",
                borderRadius: 11,
                border: "1.2px solid var(--input-border)",
                padding: "1.1rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: 6
              }}>
                <div style={{ fontWeight: 700, fontSize: "1.06rem" }}>{item.title}</div>
                <div style={{ color: "var(--sidebar-title)", fontSize: "0.96rem" }}>{item.summary}</div>
                <div style={{ fontSize: "0.89rem", color: "#456", margin: "4px 0" }}>
                  {item.duration} | 목표 {item.goals}개 | 마감 {item.due}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {item.tags.map((tag, idx) => (
                    <Tag key={idx}>{tag}</Tag>
                  ))}
                </div>
                <ProgressBar progress={item.progress} />
              </div>
            ))}
          </div>
        )}
        <div style={{ textAlign: "right", marginTop: 16 }}>
          <button
            style={{
              background: "#ecf1f5",
              color: "#666",
              border: "none",
              borderRadius: 8,
              padding: "0.45em 1.3em",
              fontWeight: 500,
              fontSize: "1rem",
              cursor: "pointer",
            }}
            onClick={() => setShowSchedulesModal(false)}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="edumatrix-root" style={{ color: "var(--text)", background: "var(--bg)", minHeight: "100vh" }}>
      <header className="topbar">
        <button className="sidebar-toggle" onClick={() => setLeftOpen(true)}>
          <span role="img" aria-label="메뉴">☰</span>
        </button>
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

      <SidebarMenu
        open={leftOpen}
        onClose={() => setLeftOpen(false)}
        onMenuClick={handleSidebarMenuClick}
      />
      <ChatbotSidebar open={rightOpen} onClose={() => setRightOpen(false)} />

      {/* ===== 카테고리 네비게이션 ===== */}
      <nav style={{
        width: "100vw",
        background: "var(--sidebar-bg)",
        borderBottom: "1.2px solid var(--input-border)",
        position: "sticky",
        top: 0,
        zIndex: 5,
        padding: "0.5rem 0",
        display: "flex",
        justifyContent: "center",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "var(--sidebar-title)",
          maxWidth: 540,
          margin: "0 auto",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {allCategories.map((cat) => (
            <button
              key={cat}
              style={{
                background: selectedCategory === cat ? "var(--button-bg)" : "var(--button-alt-bg, #f3f5fa)",
                color: selectedCategory === cat ? "var(--button-text)" : "var(--sidebar-title, #444)",
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

      {/* === [내 학습 일정 보기 버튼 & 모달] === */}
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        bottom: 20,
        left: 0,
        zIndex: 12
      }}>
        <button
          className="login-btn"
          style={{
            width: 180,
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            padding: "0.8em 0",
            background: "var(--button-bg)",
            color: "var(--button-text)",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setShowSchedulesModal(true)}
        >
          내 학습 일정 보기
        </button>
      </div>
      {showSchedulesModal && renderSchedulesModal()}

      {/* ===== 추천 상세보기 모달 ===== */}
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
                학습 계획
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

      {/* ===== 추천 수락 확인 모달 ===== */}
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
