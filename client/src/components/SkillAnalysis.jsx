import React from 'react';
// import "./SkillAnalysis.css"; // "./SkillAnalysis.css"를 임포트합니다.
import "../index.css"; // "../index.css"를 임포트합니다.
import RadarChartComponent from './RadarChartComponent'; // RadarChartComponent 임포트

function SkillAnalysis({ onBack }) { // 뒤로 가기 기능을 위한 onBack prop을 받습니다.
  return (
    <div className="skill-analysis-container">
      <button className="back-button" onClick={onBack}>
        ← 대시보드로 돌아가기
      </button>
      <h2 className="page-title">사용자 수준 분석 결과</h2>
      <main className="skill-analysis-main">
        {/* 수준 분석 결과 요약 섹션 */}
        <div className="summary-section card">
          <h3>수준 분석 결과 요약</h3>
          <div className="summary-content">
            <div className="score-box">
              <p className="score">82</p>
              <p className="unit">점</p>
            </div>
            <div className="comment-box">
              <p>평가 코멘트</p>
              <p>전반적으로 양호한 수준입니다</p> {/* OCR 결과에 따라 일단 작성 */}
            </div>
            <div className="recommendation-box">
              <p>추천 학습 유형</p>
              <p>프로젝트 기반 학습</p> {/* OCR 결과에 따라 일단 작성 */}
            </div>
          </div>
        </div>

        {/* 시각화 섹션 */}
        <div className="visualization-section card">
          <h3>시각화</h3>
          <div className="visualization-content">
            {/* 레이더 차트 영역 - placeholder 대신 RadarChartComponent 렌더링 */}
            <RadarChartComponent />
            {/* 막대 차트 영역은 삭제됨 */}
          </div>
        </div>

        {/* 분석 리포트 섹션 */}
        <div className="report-section card">
          <h3>분석 리포트</h3>
          <div className="report-content">
            <ul>
              <li>현재 수준: 중급</li>
              <li>예상 도달 목표 기간: 6개월</li>
            </ul>
            <ul>
              <li>강점: 기초, 기술력</li>
              <li>약점: 응용력</li>
            </ul>
          </div>
        </div>

        {/* 강점/약점 목표화 섹션 */}
        <div className="goals-section card">
          <h3>강점/약점 목표화</h3>
          <div className="goals-content">
             <ul>
              <li>강점: 기초, 분석력</li>
              <li>약점: 응용력</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SkillAnalysis;
