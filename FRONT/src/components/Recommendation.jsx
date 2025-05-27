import React from "react";

const recommendData = {
  english: {
    Beginner: [
      "영어 알파벳 익히기",
      "기초 단어장 외우기",
      "초급 영어회화(인사, 자기소개)",
      "매일 간단한 영어 문장 만들기 연습"
    ],
    Intermediate: [
      "뉴스 기사 읽기",
      "중급 리스닝 연습",
      "중급 문법 및 작문 훈련"
    ],
    Advance: [
      "TED 강연 듣고 요약하기",
      "원서 독서(소설, 에세이)",
      "심화 토론/에세이 쓰기"
    ]
  },
  programming: {
    Beginner: [
      "HTML, CSS 기초 다지기",
      "Python 입문(문법, 기초 예제)",
      "간단한 미니 프로젝트",
      "코딩테스트 쉬운 문제 풀기"
    ],
    Intermediate: [
      "JS/React 실전 프로젝트",
      "알고리즘/자료구조 기본",
      "API 활용 연습"
    ],
    Advance: [
      "백엔드 개발(Flask, Node.js 등)",
      "실무형 프로젝트 제작",
      "심화 알고리즘 문제"
    ]
  }
};

function Recommendation({ field, level, onBack }) {
  // 안전하게 값이 있는지 체크
  const recommendList =
    recommendData[field] && recommendData[field][level]
      ? recommendData[field][level]
      : null;

  if (!recommendList) {
    return (
      <div className="recommend-root">
        <div className="recommend-box">
          <h2>추천 학습을 불러올 수 없습니다.</h2>
          <button className="login-btn" onClick={onBack} style={{ marginTop: "2rem" }}>
            이전으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recommend-root">
      <div className="recommend-box">
        <h2>
          {field === "english" ? "영어" : "코딩"} {level} 추천 학습
        </h2>
        <ul className="recommend-list">
          {recommendList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <button className="login-btn" onClick={onBack} style={{ marginTop: "2rem" }}>
          이전으로
        </button>
      </div>
    </div>
  );
}
export default Recommendation;
