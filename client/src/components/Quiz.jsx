import React from 'react';
import '../index.css'; 

const Quiz = ({ onBack }) => {
  return (
    <div className="quiz-container">
      <button className="back-button" onClick={onBack}>← 대시보드로 돌아가기</button>
      <div className="quiz-question-section">
        <h2 className="question-text">JavaScript에서 변수를 선언할 수 없는<br/>키워드는 무엇인가요?</h2>
        <div className="options">
          <label className="option">
            <input type="radio" name="answer" value="var" /> var
          </label>
          <label className="option">
            <input type="radio" name="answer" value="let" /> let
          </label>
          <label className="option">
            <input type="radio" name="answer" value="const" /> const
          </label>
          <label className="option">
            <input type="radio" name="answer" value="define" /> define
          </label>
        </div>
        <button className="check-button">정답 확인</button>
      </div>

      <div className="quiz-result-section">
        <div className="result-header incorrect">
          <span className="icon">✅</span>
          오답
        </div>
        <div className="result-explanation">
          해설: 'define'은 JavaScript에서 변수를 선언하는 키워드가 아닙니다. 'var', let, const 는 모두 유효한 선언 키워드입니다.
        </div>
      </div>

      <div className="quiz-stats-section">
        <div className="stat-item">
          <div className="stat-label">접수</div>
          {/* Placeholder for score graph */}
          <div className="score-graph">Graph Placeholder</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">소요 시간: 40초</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">난이도</div>
          {/* Placeholder for difficulty slider */}
          <div className="difficulty-slider">Slider Placeholder</div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
