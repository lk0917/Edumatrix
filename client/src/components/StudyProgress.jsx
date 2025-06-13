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

const StudyProgress = () => {
  // 샘플 데이터 (실제로는 API에서 받아와야 함)
  const data = {
    labels: ['완료', '미완료'],
    datasets: [
      {
        data: [75, 25], // 75% 완료, 25% 미완료
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false
      }
    },
    cutout: '70%'
  };

  return (
    <div className="study-progress-container" style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px'
    }}>
      <h2 style={{ margin: 0 }}>학습 진행률</h2>
      <div className="progress-chart" style={{ width: '150px', height: '150px', position: 'relative' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default StudyProgress; 