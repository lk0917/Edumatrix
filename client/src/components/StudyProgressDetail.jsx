import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const StudyProgressDetail = ({ onBack }) => {
  // 샘플 데이터 (실제로는 API에서 받아와야 함)
  const data = {
    labels: ['완료', '미완료'],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: '주간 학습 진행률',
        font: {
          size: 24
        }
      }
    },
    cutout: '70%'
  };

  // 샘플 학습 목록 데이터
  const learningTasks = [
    { id: 1, title: '영어 문법 기초 학습', status: '완료', date: '2024-03-20' },
    { id: 2, title: '수학 미적분 문제 풀이', status: '완료', date: '2024-03-21' },
    { id: 3, title: '과학 실험 보고서 작성', status: '미완료', date: '2024-03-22' },
    { id: 4, title: '역사 시험 준비', status: '완료', date: '2024-03-23' },
  ];

  return (
    <div className="study-progress-detail">
      <button className="back-button" onClick={onBack}>
        ← 대시보드로 돌아가기
      </button>
      <div className="progress-overview">
        <div className="chart-container">
          <Doughnut data={data} options={options} />
        </div>
        <div className="progress-summary">
          <h2>이번 주 학습 현황</h2>
          <p>AI가 추천한 학습 목표 중 75%를 달성했습니다!</p>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">총 학습 목표</span>
              <span className="stat-value">4개</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">완료된 목표</span>
              <span className="stat-value">3개</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">남은 목표</span>
              <span className="stat-value">1개</span>
            </div>
          </div>
        </div>
      </div>

      <div className="learning-tasks">
        <h3>학습 목록</h3>
        <div className="task-list">
          {learningTasks.map(task => (
            <div key={task.id} className={`task-item ${task.status === '완료' ? 'completed' : 'pending'}`}>
              <div className="task-info">
                <h4>{task.title}</h4>
                <span className="task-date">{task.date}</span>
              </div>
              <span className={`task-status ${task.status === '완료' ? 'completed' : 'pending'}`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyProgressDetail; 