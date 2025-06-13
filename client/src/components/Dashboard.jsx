import React, { useState } from 'react';
import "../index.css"; 
import StudyProgress from './StudyProgress';
import StudyProgressDetail from './StudyProgressDetail';

function Dashboard() {
  const [showProgressDetail, setShowProgressDetail] = useState(false);

  // 3번부터 10번까지의 기능 목록 (바로가기 버튼용은 삭제)
  // const quickLinks = [
  //   { label: "사용자 수준 평가", key: "evaluation" }, // 3번
  //   { label: "사용자 수준 분석 결과", key: "analysis_result" }, // 4번
  //   { label: "학습 실행", key: "learning_execution" }, // 5번
  //   { label: "학습 추천", key: "recommendation" }, // 6번
  //   { label: "성취도 분석", key: "achievement_analysis" }, // 7번
  //   { label: "퀴즈", key: "quiz" }, // 8번
  //   { label: "학습 계획 수정 / 확인", key: "plan_modification" }, // 9번
  //   { label: "주간 최종 평가", key: "weekly_evaluation_final" }, // 10번
  // ];

  const handleCardClick = (cardName) => {
    if (cardName === 'Performance') {
      setShowProgressDetail(true);
    } else {
      alert(`${cardName} 카드를 클릭했습니다. 해당 페이지로 이동하는 로직 추가 필요.`);
    }
  };

  if (showProgressDetail) {
    return <StudyProgressDetail onBack={() => setShowProgressDetail(false)} />;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Dashboard</h2>
        {/* 검색, 설정, 사용자 아이콘 - 추후 구현 */}
       
      </header>
      <main className="dashboard-main">
        <div className="skill-breakdown card" data-grid-area="skill-breakdown" onClick={() => handleCardClick('Skill Breakdown')}>
          <h3>사용자 수준 분석 결과</h3>
          <p>레이더 차트 영역</p>
        </div>
        <div className="performance card" data-grid-area="performance" onClick={() => handleCardClick('Performance')}>
          <StudyProgress />
        </div>
        <div className="quizzes-evaluation card" data-grid-area="quizzes-evaluation" onClick={() => handleCardClick('Quizzes & Evaluation')}>
          <h3>퀴즈 및 수준 평가</h3>
          <p>퀴즈와 수준 평가 통합 페이지</p>
        </div>
        <div className="weekly-progress card" data-grid-area="weekly-progress">
           <h3>주간 진행률</h3>
           {/* 주간 진행률 내용 */}
        </div>
         <div className="weekly-evaluation card" data-grid-area="weekly-evaluation">
           <h3>주간 최종 평가</h3>
           {/* 주간 최종 평가 내용 */}
        </div>
        <div className="ai-recommended-task card" data-grid-area="ai-recommended-task" onClick={() => handleCardClick('AI-Recommended Task')}>
          <h3>추천 학습 목록</h3>
          <p>AI 추천 학습 과제 내용</p>
        </div>
        <div className="wulday card" data-grid-area="wulday" onClick={() => handleCardClick('Wulday')}>
          <h3>스케줄 조정</h3>
          <p>주간 달력/스케줄 영역</p>
        </div>
        <div className="performance-over-time card" data-grid-area="performance-over-time" onClick={() => handleCardClick('Performance Over Time')}>
          <h3>누적 성취도 그래프</h3>
          <p>누적 성취도 그래프</p>
        </div>
        <div className="study-notes card" data-grid-area="study-notes">
          <h3>스터디 노트</h3>
           {/* 스터디 노트 내용 */}
        </div>
         <div className="feedback card" data-grid-area="feedback">
           <h3>학습 피드백</h3>
           <p>종합적인 학습 피드백 및 분석</p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard; 