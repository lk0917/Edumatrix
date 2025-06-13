import React, { useState } from "react";
import PropTypes from "prop-types";
import "../index.css"; // 글로벌 스타일 유지

function ChatbotSidebar({ open, onClose }) {
  // 샘플 대화 메시지 상태
  const [messages, setMessages] = useState([
    { from: "bot", text: "안녕하세요! 무엇을 도와드릴까요?" }
  ]);
  const [input, setInput] = useState("");

  // 메시지 전송 함수 (AI 연동은 추후)
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    // 실제 AI 응답은 비동기로 setMessages에 추가
  };

  // 엔터키 전송 지원
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <aside className={`sidebar right${open ? " open" : ""}`}>
      <div className="chatbot-box">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="chatbot-header">
          <strong>AI 챗봇</strong>
        </div>
        <div className="chatbot-content">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.from}`}
              style={{
                marginBottom: "0.7rem",
                textAlign: msg.from === "user" ? "right" : "left"
                // 색상 관련 스타일은 CSS 변수에 맡기므로 삭제
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chatbot-input-wrap">
          <input
            className="chatbot-input"
            placeholder="질문을 입력하세요..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus={open}
          />
          <button className="chatbot-send" onClick={handleSend}>
            전송
          </button>
        </div>
      </div>
    </aside>
  );
}

ChatbotSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChatbotSidebar;
