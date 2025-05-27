import React, { useState } from "react";
import "./SelectField.css";

function SelectField({ onFieldSelected, onLevelSelected }) {
  const [field, setField] = useState(null);

  // 분야 선택
  const handleFieldClick = (selectedField) => {
    setField(selectedField);
    if (onFieldSelected) onFieldSelected(selectedField);
  };

  // 레벨 선택 (Beginner, Intermediate, Advanced, Test)
  const handleLevelClick = (level) => {
    if (onLevelSelected) onLevelSelected(field, level);
  };

  return (
    <div className="select-root">
      {!field ? (
        <>
          <h2 className="select-title">공부할 분야를 선택하세요</h2>
          <div className="field-btn-group">
            <button
              className="field-btn"
              onClick={() => handleFieldClick("english")}
            >
              <span className="emoji">Aa</span>
              English
            </button>
            <button
              className="field-btn"
              onClick={() => handleFieldClick("programming")}
            >
              <span className="emoji" role="img" aria-label="programming">🖥️</span>
              Programming
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="select-title">당신의 현재 레벨은?</h2>
          <div className="level-btn-group">
            <button className="level-btn" onClick={() => handleLevelClick("beginner")}>Beginner</button>
            <button className="level-btn" onClick={() => handleLevelClick("intermediate")}>Intermediate</button>
            <button className="level-btn" onClick={() => handleLevelClick("advanced")}>Advanced</button>
            <button className="level-btn" onClick={() => handleLevelClick("test")}>Test</button>
          </div>
        </>
      )}
    </div>
  );
}

export default SelectField;
