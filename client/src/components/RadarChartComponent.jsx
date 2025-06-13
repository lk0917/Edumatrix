//SkillAnalusis파일에 있는 레이더 차트
import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function RadarChartComponent() {
  const data = {
    labels: ['이해도', '분석력', '표현력', '응용력', '성장'],
    datasets: [
      {
        label: '사용자 수준',
        data: [80, 90, 75, 60, 85],
        backgroundColor: 'rgba(136, 132, 216, 0.2)',
        borderColor: 'rgba(136, 132, 216, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(136, 132, 216, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(136, 132, 216, 1)'
      }
    ]
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <Radar data={data} options={options} />
    </div>
  );
}

export default RadarChartComponent; 