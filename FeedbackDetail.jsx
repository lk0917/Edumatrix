//학습 피드백
import React from 'react';

function FeedbackDetail({ onBack }) {
  return (
    <div className="feedback-detail-container">
      <button className="feedback-back-btn" onClick={onBack}>← 대시보드로돌아가기</button>
      <h2 className="feedback-title">학습 피드백</h2>
      <div className="feedback-detail-main card feedback">
        {/* 왼쪽 영역 */}
        <div className="feedback-left">
          {/* 학습 피드백 입력 */}
          <div className="feedback-input-card">
            <textarea
              className="feedback-input-textarea"
              placeholder="학습 내용에 대해 입력하시오."
            />
            <button className="feedback-ai-btn">
              AI 피드백
            </button>
          </div>
          {/* AI 피드백 영역 */}
          <div className="feedback-ai-card">
            <div className="feedback-ai-title">AI 피드백</div>
            <div className="feedback-ai-msg">데이터 베이스에 관한 내용 피드백이 필요한것 같아요.<span className="feedback-ai-time">3분전</span></div>
            <div className="feedback-ai-msg">잘 점검된 것 같아요. <span className="feedback-ai-time">3분전</span></div>
            <div className="feedback-ai-msg">이 노력 잘 이해화 것 같아요!<span className="feedback-ai-time">2분전</span></div>
            {/* 말풍선 예시 */}
            <div className="feedback-ai-bubble-wrap">
              <div className="feedback-ai-bubble">
                시지드 점입<br />이 노력 같이 이해화 것 같아요!
                <button className="feedback-ai-bubble-btn">강의 보기</button>
              </div>
            </div>
          </div>
          {/* 사용자 메모 */}
          <div className="feedback-memo-card">
            <div className="feedback-memo-title">사용자 메모</div>
            <ul className="feedback-memo-list">
              <li>중요 포인트 복습하기</li>
            </ul>
            <div className="feedback-memo-link-wrap">
              <a href="#" className="feedback-memo-link">이전 학습 리뷰</a>
            </div>
          </div>
        </div>
        {/* 오른쪽 영역 */}
        <div className="feedback-right">
          {/* 학습 진행률 */}
          <div className="feedback-progress-card">
            <div className="feedback-progress-title">학습 진행률</div>
            <div className="feedback-progress-bar-wrap">
              <div className="feedback-progress-bar-bg">
                <div className="feedback-progress-bar-fill"></div>
              </div>
              <span className="feedback-progress-percent">85%</span>
            </div>
          </div>
          {/* 성취도 분석 (그래프 대체) */}
          <div className="feedback-analysis-card">
            <div className="feedback-analysis-title">성취도 분석</div>
            <div className="feedback-analysis-graph">
              <div className="feedback-bar bar1"></div>
              <div className="feedback-bar bar2"></div>
              <div className="feedback-bar bar3"></div>
              <div className="feedback-bar bar4"></div>
              <div className="feedback-bar bar5"></div>
              <div className="feedback-bar bar6"></div>
            </div>
            <div className="feedback-analysis-desc">취약 영역: 데잍터 베이스, 5개</div>
          </div>
          {/* 추천 보완 콘텐츠 */}
          <div className="feedback-recommend-card">
            <div className="feedback-recommend-title">추천 보완 콘텐츠</div>
            <div className="feedback-recommend-icon">
              {/* 네트워크 아이콘 대체 */}
              <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#b6d4fe" /><circle cx="24" cy="24" r="12" fill="#2563eb" opacity="0.7" /><circle cx="24" cy="12" r="3" fill="#2563eb" /><circle cx="36" cy="24" r="3" fill="#2563eb" /><circle cx="24" cy="36" r="3" fill="#2563eb" /><circle cx="12" cy="24" r="3" fill="#2563eb" /><line x1="24" y1="15" x2="24" y2="33" stroke="#2563eb" strokeWidth="2" /><line x1="15" y1="24" x2="33" y2="24" stroke="#2563eb" strokeWidth="2" /></svg>
            </div>
            <div className="feedback-recommend-desc">데이터 베이스</div>
            <button className="feedback-recommend-btn">강의 보기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackDetail; 