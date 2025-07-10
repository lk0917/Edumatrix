import React, { useState, useEffect } from "react";
import "../index.css";

const KEY_TO_LABEL = {
  python: "Python",
  cpp: "C++",
  java: "Java",
  htmlcss: "HTML/CSS",
  javascript: "JavaScript",
};

const resultLevel = (score, total) => {
  const percent = total === 0 ? 0 : score / total;
  if (percent >= 0.8) return "Advanced";
  if (percent < 0.3) return "Beginner";
  return "Intermediate";
};

function LevelTest({ field, onBack, onComplete, isNewUser }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(null);

        const query = new URLSearchParams({
          field: typeof field === "string" ? field : field.field,
          language: typeof field === "object" ? field.languages?.[0] : undefined,
          limit: 10
        });

        const res = await fetch(`http://localhost:3001/api/test-questions?${query}`);
        const data = await res.json();
        setQuestions(data);
        setSelected(Array(data.length).fill(null));
      } catch (err) {
        console.error("문제 불러오기 실패", err);
        setError("문제를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [field]);

  const handleOption = (idx) => {
    if (submitted) return;
    const copy = [...selected];
    copy[current] = idx;
    setSelected(copy);
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = () => {
    const correct = questions.reduce(
      (acc, q, idx) => acc + (selected[idx] === q.answer ? 1 : 0),
      0
    );
    setScore(correct);
    setSubmitted(true);

    setTimeout(() => {
      if (onComplete) onComplete(resultLevel(correct, questions.length), isNewUser);
    }, 1600);
  };

  const currentQuestion = questions[current];

  return (
    <div className="leveltest-root">
      <div className="leveltest-box">
        <div style={{ marginBottom: "1.2rem" }}>
          <button className="leveltest-back" onClick={onBack}>←</button>
          <span className="leveltest-title">
            {field === "english"
              ? "영어 레벨 테스트"
              : typeof field === "object" && field.field === "programming"
              ? `프로그래밍 레벨 테스트`
              : "레벨 테스트"}
          </span>
        </div>

        {loading ? (
          <div>문제를 불러오는 중입니다...</div>
        ) : error ? (
          <div style={{ color: "#d44", fontWeight: 700 }}>{error}</div>
        ) : !questions.length ? (
          <div style={{ color: "#d44", fontWeight: 700 }}>문제가 없습니다.</div>
        ) : !submitted ? (
          <>
            <div className="leveltest-q">
              <span style={{ color: "#8fa4c4", fontSize: "1.05rem" }}>
                Q{current + 1}.
              </span>{" "}
              {currentQuestion.question}
              {currentQuestion.language && (
                <span style={{ marginLeft: 10, color: "#999", fontSize: "0.95em" }}>
                  ({currentQuestion.language})
                </span>
              )}
            </div>
            <div className="leveltest-options">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`leveltest-opt-btn${selected[current] === idx ? " selected" : ""}`}
                  onClick={() => handleOption(idx)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div style={{ marginTop: "1.1rem", display: "flex", gap: 12, justifyContent: "center" }}>
              <button className="leveltest-nav" onClick={handlePrev} disabled={current === 0}>이전</button>
              <button
                className="leveltest-nav"
                onClick={handleNext}
                disabled={current === questions.length - 1 || selected[current] === null}
              >다음</button>
              <button
                className="leveltest-submit"
                disabled={selected.includes(null)}
                onClick={handleSubmit}
                style={{ marginLeft: 10 }}
              >
                제출
              </button>
            </div>
            <div style={{ marginTop: "0.8rem", color: "#8894aa", fontSize: "0.97rem" }}>
              {current + 1} / {questions.length}
            </div>
          </>
        ) : (
          <div className="leveltest-result">
            <div style={{ fontWeight: 700, fontSize: "1.21rem", color: "#3878d7", marginBottom: "1rem" }}>
              결과: {resultLevel(score, questions.length)}
            </div>
            <div style={{ color: "#222", marginBottom: "0.9rem" }}>
              정답: {score}개 / {questions.length}문항
            </div>
            <div style={{ color: "#888" }}>
              곧 추천 학습 페이지로 이동합니다...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LevelTest;
