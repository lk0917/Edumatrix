import React from "react";

function ProgressBar({ progress }) {
  return (
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
}

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

export default function LearningSchedule({ schedules, onRemove, onComplete }) {
  return (
    <div style={{ maxWidth: 540, margin: "0 auto", padding: "1.6rem 1rem" }}>
      <h2 style={{
        fontSize: "1.25rem",
        fontWeight: 700,
        color: "var(--sidebar-title)",
        marginBottom: 16,
      }}>내 학습 일정</h2>
      {(!schedules || schedules.length === 0) ? (
        <div style={{ color: "var(--sidebar-title)", textAlign: "center", margin: "4rem 0" }}>
          아직 수락한 학습 일정이 없습니다.<br />AI 추천을 먼저 수락해보세요!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {schedules.map((rec, idx) => (
            <div key={rec.id + idx}
              style={{
                background: "var(--card-bg)",
                borderRadius: 11,
                boxShadow: "var(--card-shadow)",
                padding: "1.1rem 1.3rem",
                position: "relative",
                color: rec.completed ? "#ccc" : "var(--text)",
                opacity: rec.completed ? 0.5 : 1,
              }}>
              <div style={{
                fontWeight: 700,
                fontSize: "1.12rem",
                marginBottom: 6,
                textDecoration: rec.completed ? "line-through" : "none",
              }}>{rec.title}</div>
              <div style={{ fontSize: "0.93rem", color: "var(--sidebar-title)", marginBottom: 9 }}>
                {rec.summary}
              </div>
              <div style={{ display: "flex", gap: 13, fontSize: "0.88rem", color: "var(--sidebar-title)" }}>
                <span>⏱{rec.time}</span>
                <span>{rec.duration}</span>
                <span>목표 {rec.goals}개</span>
              </div>
              <div style={{ margin: "8px 0" }}>
                {rec.tags && rec.tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
              </div>
              <div style={{ margin: "8px 0" }}>
                진행률: {rec.progress || 0}%
                <ProgressBar progress={rec.progress || 0} />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 7 }}>
                <button
                  onClick={() => onComplete(rec.id)}
                  disabled={rec.completed}
                  style={{
                    background: rec.completed ? "#c6decf" : "var(--button-bg)",
                    color: rec.completed ? "#555" : "var(--button-text)",
                    border: "none",
                    borderRadius: 7,
                    padding: "0.45em 1.1em",
                    fontWeight: 600,
                    fontSize: "0.96rem",
                    cursor: rec.completed ? "not-allowed" : "pointer",
                  }}>
                  {rec.completed ? "완료됨" : "완료"}
                </button>
                <button
                  onClick={() => onRemove(rec.id)}
                  style={{
                    background: "#f0e1e2",
                    color: "#b64747",
                    border: "none",
                    borderRadius: 7,
                    padding: "0.45em 1.1em",
                    fontWeight: 600,
                    fontSize: "0.96rem",
                    cursor: "pointer"
                  }}>
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
