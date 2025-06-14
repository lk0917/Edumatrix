import React, { useState } from 'react';
import "../index.css";
import StudyProgress from './StudyProgress';
import StudyProgressDetail from './StudyProgressDetail';
import SkillAnalysis from './SkillAnalysis'; // SkillAnalysis 컴포넌트 임포트
import RadarChartComponent from './RadarChartComponent'; // RadarChartComponent 임포트 추가
import Quiz from './Quiz'; // Quiz 컴포넌트 임포트 유지
import QuizQuestionCard from './QuizQuestionCard'; // QuizQuestionCard 컴포넌트 다시 임포트
// import QuizQuestionCard from './QuizQuestionCard'; // QuizQuestionCard 컴포넌트 임포트 제거

function Dashboard() {
  const [showProgressDetail, setShowProgressDetail] = useState(false);
  const [showSkillAnalysis, setShowSkillAnalysis] = useState(false); // SkillAnalysis 표시 상태 유지
  const [showQuiz, setShowQuiz] = useState(false); // Quiz 표시 상태 유지

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
    } else if (cardName === 'Skill Breakdown') { // '사용자 수준 분석 결과' 카드 클릭 시
      setShowSkillAnalysis(true); // SkillAnalysis 표시 상태 변경
    } else if (cardName === 'Quizzes & Evaluation') { // '퀴즈 및 수준 평가' 카드 클릭 시 이동 로직 유지
      setShowQuiz(true); // Quiz 표시 상태 변경
    }
     else {
      alert(`${cardName} 카드를 클릭했습니다. 해당 페이지로 이동하는 로직 추가 필요.`);
    }
  };

  if (showProgressDetail) {
    return <StudyProgressDetail onBack={() => setShowProgressDetail(false)} />;
  }

  if (showSkillAnalysis) { // SkillAnalysis 표시 상태일 때
    return <SkillAnalysis onBack={() => setShowSkillAnalysis(false)} />; // SkillAnalysis 렌더링 및 뒤로 가기 함수 전달
  }

  if (showQuiz) { // Quiz 표시 상태일 때 렌더링 로직 유지
    return <Quiz onBack={() => setShowQuiz(false)} />; // Quiz 렌더링 및 뒤로 가기 함수 전달
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
          <div style={{ width: '100%', height: 'auto' }}>
            <RadarChartComponent />
          </div>
        </div>
        <div className="performance card" data-grid-area="performance" onClick={() => handleCardClick('Performance')} style={{ gridRow: 'span 1' }}>
          <StudyProgress />
        </div>
        <div className="quizzes-evaluation card" data-grid-area="quizzes-evaluation" onClick={() => handleCardClick('Quizzes & Evaluation')}>
          <h3>퀴즈 및 수준 평가</h3>
          <QuizQuestionCard />
        </div>
         <div className="weekly-evaluation card" data-grid-area="weekly-evaluation">
           <h3>주간 최종 평가</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
             <div style={{ 
               display: 'flex', 
               justifyContent: 'space-between', 
               alignItems: 'center',
               padding: '1rem',
               backgroundColor: 'var(--section-bg)',
               borderRadius: '8px'
             }}>
               <div>
                 <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--sidebar-title)' }}>이번 주 학습 성취도</h4>
                 <p style={{ margin: 0, color: 'var(--text)' }}>목표 대비 달성률: 85%</p>
               </div>
               <div style={{ 
                 fontSize: '2rem', 
                 fontWeight: 'bold', 
                 color: 'var(--sidebar-title)'
               }}>
                 85%
               </div>
             </div>
             <div style={{ 
               flex: 1,
               display: 'grid',
               gridTemplateColumns: 'repeat(2, 1fr)',
               gap: '1rem',
               padding: '1rem',
               backgroundColor: 'var(--card-bg)',
               borderRadius: '8px',
               border: '1px solid var(--sidebar-border)'
             }}>
               <div>
                 <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--sidebar-title)' }}>주요 성취</h4>
                 <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text)' }}>
                   <li>기초 문법 완벽 이해</li>
                   <li>프로젝트 2개 완료</li>
                   <li>코드 리뷰 참여</li>
                 </ul>
               </div>
               <div>
                 <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--sidebar-title)' }}>개선 필요 사항</h4>
                 <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text)' }}>
                   <li>알고리즘 문제 풀이</li>
                   <li>디자인 패턴 학습</li>
                 </ul>
               </div>
             </div>
           </div>
         </div>
        <div className="ai-recommended-task card" data-grid-area="ai-recommended-task" onClick={() => handleCardClick('AI-Recommended Task')} style={{ gridRow: 'span 1', height: 'fit-content' }}>
          <h3>추천 학습 목록</h3>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            padding: '1rem',
            backgroundColor: 'var(--section-bg)',
            borderRadius: '8px'
          }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--sidebar-title)' }}>이번 주 추천 학습</h4>
              <ul style={{ margin: '0 0 1rem 0', paddingLeft: '1.5rem', color: 'var(--text)' }}>
                <li>기초 문법 완벽 이해</li>
                <li>프로젝트 2개 완료</li>
                <li>코드 리뷰 참여</li>
              </ul>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--sidebar-title)' }}>다음 주 추천 학습</h4>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text)' }}>
                <li>알고리즘 문제 풀이</li>
                <li>디자인 패턴 학습</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="wulday card" data-grid-area="wulday" onClick={() => handleCardClick('Wulday')}>
          <h3>스케줄 조정</h3>
          <p>주간 달력/스케줄 영역</p>
        </div>
        <div className="performance-over-time card" data-grid-area="performance-over-time" onClick={() => handleCardClick('Performance Over Time')}>
          <h3>누적 성취도 그래프</h3>
          <p>누적 성취도 그래프</p>
        </div>
        <div className="study-notes card" data-grid-area="study-notes" style={{ gridRow: 'span 2' }}>
          <h3>스터디 노트</h3>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            height: '100%',
            padding: '1rem',
            backgroundColor: 'var(--section-bg)',
            borderRadius: '8px'
          }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--sidebar-title)' }}>최근 학습 노트</h4>
              <div style={{ 
                backgroundColor: 'var(--card-bg)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--sidebar-border)',
                height: 'calc(100% - 2rem)'
              }}>
                {/* 스터디 노트 내용 */}
                <p style={{ margin: 0, color: 'var(--text)' }}>여기에 스터디 노트 내용이 표시됩니다.</p>
              </div>
            </div>
          </div>
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