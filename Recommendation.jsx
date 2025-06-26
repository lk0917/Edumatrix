// 추천
import React from "react";

function Recommendation({ recommendations, onBack }) {
  // 더미 데이터 fallback
  const defaultRecs = [
    {
      title: "이번주 학습 추천",
      subject: "네트워크 기초",
      summary: "주간 학습 계획 요약",
      time: "3시간",
      plan: [
        { label: "강의 시청", days: ["월", "화", "수"] },
        { label: "연습 문제", days: ["수", "목"] },
      ],
      reason: "최근 컴퓨터 네트워킹에 대한 관심도 증가",
      pie: [0.66, 0.34],
      pieLabels: ["강의 시청", "연습 문제"],
      due: "5월 10일",
      goals: 2,
    },
    {
      title: "다음주 학습 추천",
      subject: "파이썬 프로그래밍",
      summary: "주간 학습 계획 요약",
      time: "3시간",
      plan: [
        { label: "기초 문법", days: ["월", "화", "수"] },
        { label: "퀴즈 도전", days: ["수", "목"] },
      ],
      reason: "새로운 프로그래밍 언어 학습에 대한 제안",
      pie: [0.66, 0.34],
      pieLabels: ["기초 문법", "퀴즈 도전"],
      due: "6월 28일",
      goals: 2,
    },
  ];
  const recs = recommendations || defaultRecs;

  function PieChart({ data, colors }) {
    const r = 36, cx = 40, cy = 40;
    let startAngle = 0;
    const paths = data.map((v, i) => {
      const angle = v * 360;
      const x1 = cx + r * Math.cos((Math.PI / 180) * (startAngle - 90));
      const y1 = cy + r * Math.sin((Math.PI / 180) * (startAngle - 90));
      const endAngle = startAngle + angle;
      const x2 = cx + r * Math.cos((Math.PI / 180) * (endAngle - 90));
      const y2 = cy + r * Math.sin((Math.PI / 180) * (endAngle - 90));
      const largeArc = angle > 180 ? 1 : 0;
      const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`;
      startAngle += angle;
      return <path key={i} d={d} fill={colors[i]} />;
    });
    return (
      <svg width={80} height={80} viewBox="0 0 80 80">{paths}</svg>
    );
  }

  return (
    <div className="recommend-root">
      <div className="recommend-back-row">
        <button className="recommend-back-btn" onClick={onBack}>
          ← 대시보드로 돌아가기
        </button>
      </div>
      {recs.map((rec, idx) => (
        <div className="recommend-card" key={idx}>
          <div className="recommend-title-row">
            <h2 className="recommend-main-title">{rec.title}</h2>
            <div className="recommend-btn-row">
              <button className="recommend-btn-outlined" onClick={() => alert('수정하기 기능은 준비중입니다.')}>수정하기</button>
              <button className="recommend-btn" onClick={() => alert('수락하기 기능은 준비중입니다.')}>수락하기</button>
            </div>
          </div>
          <div className="recommend-topbox">
            <div className="recommend-subject">• {rec.subject}</div>
            <div className="recommend-subtext">{rec.summary}</div>
            <div className="recommend-subtext">{rec.time}</div>
          </div>
          <div className="recommend-plan-section">
            <div className="recommend-planbox">
              <div className="recommend-plan-title">주간 학습 계획 요약</div>
              <div className="recommend-days-row">
                {["일", "학", "수", "목", "금", "토", "일"].map(day => (
                  <div className="recommend-day" key={day}>{day}</div>
                ))}
              </div>
              <div className="recommend-bar-row">
                {rec.plan.map((item, i) => (
                  <div className="recommend-bar" key={i}>
                    <div className="recommend-bar-label">{item.label}</div>
                    <div className="recommend-bar-graph">
                      <div className="recommend-bar-fill" style={{ width: `${item.days.length * 14.2}%`, background: 'linear-gradient(90deg, #4B6CB7 60%, #6b8bd4 100%)' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="recommend-reason">추천 이유: {rec.reason}</div>
            </div>
            <div className="recommend-piebox">
              <div className="recommend-pie-title">AI 추천 계획</div>
              <PieChart data={rec.pie} colors={["#4B6CB7", "#6b8bd4"]} />
              <div className="recommend-pie-legend">
                {rec.pieLabels.map((label, i) => (
                  <div className="recommend-legend-item" key={i}>
                    <div className="recommend-color-dot" style={{ background: i === 0 ? "#4B6CB7" : "#6b8bd4" }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="recommend-bottom-row">
            <div className="recommend-due">예상 완료 일정&nbsp; {rec.due}</div>
            <div className="recommend-progress-bar">
              <div className="recommend-progress-fill" style={{ width: "60%", background: 'linear-gradient(90deg, #4B6CB7 60%, #6b8bd4 100%)' }} />
            </div>
            <div className="recommend-goal">학습 목표 수&nbsp; {rec.goals}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recommendation;
