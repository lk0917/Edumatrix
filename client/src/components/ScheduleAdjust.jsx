import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// 날짜별 스케줄 예시 데이터
const initialSchedules = {
  // 'YYYY-MM-DD': [ { id, text }, ... ]
  '2025-06-20': [
    { id: 1, text: '알고리즘 개념 학습' },
    { id: 2, text: '자료 구조 복습' },
    { id: 3, text: '문제 풀이 연습' },
    { id: 4, text: '모의 테스트' },
  ],
  '2025-06-22': [
    { id: 5, text: '알고리즘 복습' },
    { id: 6, text: '실전 문제 풀이' },
  ],
};

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function ScheduleAdjust({ onBack }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState(initialSchedules);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const dateKey = formatDate(selectedDate);
  const todaySchedules = schedules[dateKey] || [];

  // 삭제 기능
  const handleDelete = (id) => {
    setSchedules((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((item) => item.id !== id),
    }));
    if (editId === id) {
      setEditId(null);
      setEditValue('');
    }
  };

  // 수정 시작
  const handleEditStart = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  // 수정 저장
  const handleEditSave = (id) => {
    setSchedules((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].map((item) =>
        item.id === id ? { ...item, text: editValue } : item
      ),
    }));
    setEditId(null);
    setEditValue('');
  };

  // 수정 취소
  const handleEditCancel = () => {
    setEditId(null);
    setEditValue('');
  };

  return (
    <div style={{ background: '#FFF7F0', minHeight: '100vh', padding: '0', fontFamily: 'inherit', position: 'relative' }}>
      {/* 상단 바 영역 */}
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative', height: '4rem' }}>
        <button
          onClick={onBack}
          style={{
            marginLeft: '1.2rem',
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            color: '#19305B',
            padding: '0.5rem 1.2rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            transition: 'background 0.2s',
            zIndex: 10,
          }}
          className="back-button study-note-back"
          title="대시보드로 돌아가기"
        >
          ← 대시보드로 돌아가기
        </button>
      </div>
      {/* 상단 타이틀 */}
      <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2.5rem', color: '#19305B', marginTop: '1.5rem', letterSpacing: '-2px' }}>
        학습 계획 수정 / 확인
      </div>
      {/* 달력 및 리스트 영역 */}
      <div style={{ maxWidth: 500, margin: '2.5rem auto 0', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0001', padding: '2rem 1.5rem' }}>
        {/* 달력 상단 (월/연도) */}
        <div style={{ background: '#F48B5A', color: '#fff', fontWeight: 'bold', fontSize: '2rem', borderRadius: '12px 12px 0 0', textAlign: 'center', padding: '0.7rem 0 0.5rem 0', letterSpacing: '-1px' }}>
          {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
        </div>
        {/* 달력 */}
        <div style={{ background: '#2B8C7E', borderRadius: '0 0 12px 12px', padding: '0.5rem 0 1.5rem 0' }}>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            locale="ko-KR"
            calendarType="gregory"
            formatDay={(_, date) => date.getDate()}
            next2Label={null}
            prev2Label={null}
            tileClassName={({ date, view }) => {
              if (view === 'month' && date.toDateString() === selectedDate.toDateString()) {
                return 'selected-calendar-day';
              }
              return null;
            }}
            showNeighboringMonth={false}
          />
        </div>
        {/* 학습 계획 리스트 */}
        <div style={{ marginTop: '2rem' }}>
          {todaySchedules.length === 0 ? (
            <div style={{ color: '#888', textAlign: 'center', margin: '2rem 0' }}>스케줄이 없습니다.</div>
          ) : (
            todaySchedules.map(plan => (
              <div key={plan.id} style={{ background: '#FFE08C', borderRadius: 12, display: 'flex', alignItems: 'center', padding: '1rem', marginBottom: '1rem', fontWeight: 600, fontSize: '1.2rem', boxShadow: '0 1px 4px #0001' }}>
                <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>≡</span>
                {editId === plan.id ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      style={{ flex: 1, fontSize: '1.1rem', padding: '0.3rem', borderRadius: 6, border: '1px solid #ccc', marginRight: '0.7rem' }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleEditSave(plan.id);
                        if (e.key === 'Escape') handleEditCancel();
                      }}
                      autoFocus
                    />
                    <span style={{ fontSize: '1.2rem', marginRight: '0.7rem', cursor: 'pointer' }} onClick={() => handleEditSave(plan.id)} title="저장">✔️</span>
                    <span style={{ fontSize: '1.2rem', marginRight: '0.7rem', cursor: 'pointer' }} onClick={handleEditCancel} title="취소">❌</span>
                  </>
                ) : (
                  <>
                    <span style={{ flex: 1 }}>{plan.text}</span>
                    <span style={{ fontSize: '1.2rem', marginRight: '0.7rem', cursor: 'pointer' }} onClick={() => handleEditStart(plan.id, plan.text)} title="수정">✏️</span>
                  </>
                )}
                <span style={{ fontSize: '1.2rem', cursor: 'pointer' }} onClick={() => handleDelete(plan.id)} title="삭제">🗑️</span>
              </div>
            ))
          )}
        </div>
        {/* AI 재추천 버튼 */}
        <button style={{ width: '100%', background: '#3B6DB0', color: '#fff', fontWeight: 'bold', fontSize: '1.3rem', border: 'none', borderRadius: 10, padding: '1rem', marginTop: '1.5rem', cursor: 'pointer', boxShadow: '0 1px 4px #0001' }}>
          AI 재추천
        </button>
      </div>
    </div>
  );
}

export default ScheduleAdjust; 