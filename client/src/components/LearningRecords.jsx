import React, { useState, useEffect } from "react";
import SidebarMenu from "./SidebarMenu";
import ChatbotSidebar from "./ChatbotSidebar";
import icon1 from "../assets/icon1.png";
import "../index.css";

function getLocalRecords() {
  const data = localStorage.getItem("learning-records");
  try {
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setLocalRecords(records) {
  localStorage.setItem("learning-records", JSON.stringify(records));
}

// onMenuClick prop 추가로 받기 (부모로부터)
function LearningRecords({ onMenuClick }) {
  // 사이드바/챗봇 열림 상태 관리
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const [records, setRecords] = useState(getLocalRecords());
  const [form, setForm] = useState({ date: "", title: "", status: "완료" });
  const [editIdx, setEditIdx] = useState(null);

  useEffect(() => {
    setLocalRecords(records);
  }, [records]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.date.trim()) return;
    if (editIdx !== null) {
      const updated = records.map((r, i) => (i === editIdx ? { ...form } : r));
      setRecords(updated);
      setEditIdx(null);
    } else {
      setRecords([...records, { ...form }]);
    }
    setForm({ date: "", title: "", status: "완료" });
  };

  const handleDelete = (idx) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setRecords(records.filter((_, i) => i !== idx));
    }
  };

  const handleEdit = (idx) => {
    setForm({ ...records[idx] });
    setEditIdx(idx);
  };

  const handleCancel = () => {
    setForm({ date: "", title: "", status: "완료" });
    setEditIdx(null);
  };

  return (
    <div className="edumatrix-root">
      <SidebarMenu
        open={leftOpen}
        onClose={() => setLeftOpen(false)}
        onMenuClick={(key) => {
          setLeftOpen(false); // 사이드바 닫기
          if (onMenuClick) onMenuClick(key); // 부모에 이벤트 전달
        }}
      />
      <ChatbotSidebar open={rightOpen} onClose={() => setRightOpen(false)} />

      <header className="topbar">
        <button className="sidebar-toggle" onClick={() => setLeftOpen(true)}>
          <span role="img" aria-label="메뉴">
            ☰
          </span>
        </button>
        <h2 style={{ margin: 0, fontSize: "1.3rem", color: "var(--sidebar-title)" }}>
          학습 기록
        </h2>
        <div style={{ flex: 1 }} />
        <button className="chatbot-toggle" onClick={() => setRightOpen(true)}>
          <img src={icon1} alt="AI 챗봇" className="chatbot-icon-btn" />
        </button>
      </header>

      <main style={{ margin: "0 auto", maxWidth: 460, padding: "2.2rem 1rem" }}>
        {/* 기록 추가/수정 폼 */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 22,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            style={{
              padding: "0.5em 0.9em",
              borderRadius: 9,
              border: "1px solid var(--input-border)",
              fontSize: "1rem",
              background: "var(--input-bg)",
              color: "var(--input-text)",
            }}
          />
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="학습 내용"
            required
            style={{
              flex: 1,
              minWidth: 120,
              padding: "0.5em 0.9em",
              borderRadius: 9,
              border: "1px solid var(--input-border)",
              fontSize: "1rem",
              background: "var(--input-bg)",
              color: "var(--input-text)",
            }}
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{
              padding: "0.5em 0.8em",
              borderRadius: 9,
              border: "1px solid var(--input-border)",
              background: "var(--input-bg)",
              color: "var(--input-text)",
              fontSize: "1rem",
            }}
          >
            <option value="완료">완료</option>
            <option value="미완료">미완료</option>
          </select>
          <button
            type="submit"
            className="login-btn"
            style={{
              padding: "0.5em 1.2em",
              fontSize: "1.04rem",
              borderRadius: 9,
              minWidth: 60,
              background: "var(--button-bg)",
              color: "var(--button-text)",
              fontWeight: 700,
            }}
          >
            {editIdx !== null ? "수정" : "추가"}
          </button>
          {editIdx !== null && (
            <button
              type="button"
              style={{
                padding: "0.5em 1.2em",
                fontSize: "1.04rem",
                borderRadius: 9,
                minWidth: 60,
                background: "var(--button-alt-bg, #eee)",
                color: "var(--sidebar-title, #222)",
                fontWeight: 700,
                marginLeft: 4,
              }}
              onClick={handleCancel}
            >
              취소
            </button>
          )}
        </form>

        {/* 기록 목록 */}
        <ul style={{ padding: 0, listStyle: "none" }}>
          {records.map((rec, i) => (
            <li
              key={i}
              style={{
                background: "var(--card-bg)",
                color: "var(--text)",
                marginBottom: 12,
                borderRadius: 13,
                boxShadow: "var(--card-shadow)",
                padding: "1.1rem 1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{rec.title}</div>
                <div
                  style={{
                    fontSize: "0.97rem",
                    color: "var(--sidebar-title)",
                    marginTop: 2,
                  }}
                >
                  {rec.date}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    background:
                      rec.status === "완료"
                        ? "var(--button-bg)"
                        : "var(--sidebar-hover)",
                    color:
                      rec.status === "완료"
                        ? "var(--button-text)"
                        : "var(--sidebar-title)",
                    fontWeight: 600,
                    borderRadius: 9,
                    padding: "0.47em 1.2em",
                    fontSize: "1rem",
                  }}
                >
                  {rec.status}
                </span>
                <button
                  onClick={() => handleEdit(i)}
                  aria-label="수정"
                  style={{
                    marginLeft: 3,
                    border: "none",
                    background: "var(--sidebar-hover)",
                    borderRadius: 7,
                    padding: "0.3em 0.7em",
                    fontSize: "0.97rem",
                    cursor: "pointer",
                    color: "var(--sidebar-title)",
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  aria-label="삭제"
                  style={{
                    marginLeft: 3,
                    border: "none",
                    background: "#ffdde2",
                    borderRadius: 7,
                    padding: "0.3em 0.7em",
                    fontSize: "0.97rem",
                    cursor: "pointer",
                    color: "#d73c3c",
                    fontWeight: 600,
                  }}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
        {records.length === 0 && (
          <div style={{ textAlign: "center", color: "var(--sidebar-title)" }}>
            기록이 없습니다.
          </div>
        )}
      </main>
    </div>
  );
}

export default LearningRecords;
