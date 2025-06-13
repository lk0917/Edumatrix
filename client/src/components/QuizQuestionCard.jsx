import React from 'react';
import '../index.css'; // Assuming necessary styles are in index.css

const QuizQuestionCard = () => {
  return (
    <div className="quiz-question-section">
      <h3 className="question-text">JavaScript에서 변수를 선언할 수 없는<br/>키워드는 무엇인가요?</h3>
      <div className="options">
        <label className="option">
          <input type="radio" name="answer" value="var" /> var
        </label>
        <label className="option">
          <input type="radio" name="answer" value="let" /> let
        </label>
        <label className="option">
          <input type="radio" name="answer" value="const" /> const
        </label>
        <label className="option">
          <input type="radio" name="answer" value="define" /> define
        </label>
      </div>
      {/* The check button might not be needed in the card view, 
          or its functionality might be different. Keeping it for now based on image. */}
      {/* <button className="check-button">정답 확인</button> */}
    </div>
  );
};

export default QuizQuestionCard; 