import React from "react";

export default function WeeklyFinalEvaluation({ onBack }) {
  return (
    <div className="weekly-final-container">
      {onBack && (
        <button className="back-button" onClick={onBack}>
          ← 대시보드로 돌아가기
        </button>
      )}
      <h1 className="weekly-final-title">주간 최종 평가</h1>
      <div className="weekly-final-grid">
        <div className="weekly-final-card weekly-final-summary">
          <div className="weekly-final-section-title">평가 결과 요약</div>
          <div className="weekly-final-score">85 <span className="weekly-final-score-unit">점</span></div>
          <div className="weekly-final-feedback-title">피드백</div>
          <div className="weekly-final-feedback">좋은 시도였어요!<br/>문제 3을 주의하세요.</div>
          <button className="weekly-final-submit-btn">제출</button>
        </div>
        <div>
          <div className="weekly-final-card weekly-final-achievement">
            <div className="weekly-final-section-title">주요 성취도</div>
            <div>- 주요 개념에 대한 이해도 높음</div>
          </div>
          <div className="weekly-final-card weekly-final-improve">
            <div className="weekly-final-section-title">개선 필요 사항</div>
            <div>- 문제 해결 속도 항상 필요</div>
          </div>
        </div>
      </div>
      <div className="weekly-final-growth-section">
        <div className="weekly-final-section-title">성장을 시각화</div>
        <div className="weekly-final-growth-chart">
          <div className="weekly-final-bar" style={{height: 40}}>전반기</div>
          <div className="weekly-final-arrow">→</div>
          <div className="weekly-final-bar" style={{height: 80}}>후반기</div>
        </div>
      </div>
      <button className="weekly-final-next-btn">다음 학습 추천</button>
    </div>
  );
}