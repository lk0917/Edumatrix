import React, { useState } from "react";

const questionsData = {
  english: [
    {
      question: "다음 중 ‘apple’의 뜻은?",
      options: ["사과", "포도", "바나나", "배"],
      answer: 0,
    },
    {
      question: "She ___ to the library every day. (빈칸에 들어갈 알맞은 말은?)",
      options: ["go", "goes", "gone", "going"],
      answer: 1,
    },
    {
      question: "다음 중 ‘친구’에 해당하는 영어 단어는?",
      options: ["Friend", "Tree", "Book", "Table"],
      answer: 0,
    },
  ],
  programming: [
    {
      question: "JavaScript에서 변수 선언에 사용하는 키워드는?",
      options: ["int", "var", "dim", "letin"],
      answer: 1,
    },
    {
      question: "HTML의 <b>기본 구조</b>가 아닌 것은?",
      options: ["<head>", "<body>", "<footer>", "<python>"],
      answer: 3,
    },
    {
      question: "Python에서 리스트의 길이를 구하는 함수는?",
      options: ["size()", "count()", "len()", "length()"],
      answer: 2,
    },
  ],
};

const resultLevel = (score) => {
  if (score <= 1) return "Beginner";
  if (score === 2) return "Intermediate";
  return "Advance";
};

function LevelTest({ field, onBack, onComplete }) {
  const questions = questionsData[field] || [];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // field가 올바르지 않으면 에러 안내
  if (!questions.length) {
    return (
      <div className="leveltest-root">
        <div className="leveltest-box">
          <div style={{ color: "#d44", fontWeight: 700 }}>
            유효하지 않은 분야입니다.
          </div>
          <button className="leveltest-back" style={{ marginTop: 20 }} onClick={onBack}>← 이전</button>
        </div>
      </div>
    );
  }

  // 답변 체크
  const handleOption = (idx) => {
    if (submitted) return;
    setSelected((prev) => {
      const copy = [...prev];
      copy[current] = idx;
      return copy;
    });
  };

  // 다음 문제
  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  // 이전 문제
  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  // 제출
  const handleSubmit = () => {
    const correct = questions.reduce(
      (acc, q, idx) => acc + (selected[idx] === q.answer ? 1 : 0),
      0
    );
    setScore(correct);
    setSubmitted(true);

    setTimeout(() => {
      // 결과 전달 및 추천 화면으로 이동
      if (onComplete) onComplete(resultLevel(correct));
    }, 1600); // 1.6초 후 이동 (UX 효과)
  };

  // 현재 문제 안전하게 렌더링
  const currentQuestion = questions[current];

  return (
    <div className="leveltest-root">
      <div className="leveltest-box">
        <div style={{ marginBottom: "1.2rem" }}>
          <button className="leveltest-back" onClick={onBack}>←</button>
          <span className="leveltest-title">
            {field === "english" ? "영어 레벨 테스트" : "코딩 레벨 테스트"}
          </span>
        </div>
        {!submitted ? (
          currentQuestion ? (
            <>
              <div className="leveltest-q">
                <span style={{ color: "#8fa4c4", fontSize: "1.05rem" }}>
                  Q{current + 1}.
                </span>{" "}
                {currentQuestion.question}
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
                <button
                  className="leveltest-nav"
                  onClick={handlePrev}
                  disabled={current === 0}
                >이전</button>
                <button
                  className="leveltest-nav"
                  onClick={handleNext}
                  disabled={
                    current === questions.length - 1 ||
                    selected[current] === null
                  }
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
            <div style={{ color: "#d44", fontWeight: 700 }}>
              문항을 불러올 수 없습니다.
            </div>
          )
        ) : (
          <div className="leveltest-result">
            <div style={{ fontWeight: 700, fontSize: "1.21rem", color: "#3878d7", marginBottom: "1rem" }}>
              결과: {resultLevel(score)}
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
