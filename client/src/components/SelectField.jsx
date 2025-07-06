import React, { useState } from "react";
import "../index.css";

const LANGUAGES = [
  { key: "python", label: "Python" },
  { key: "cpp", label: "C/C++" },
  { key: "java", label: "Java" },
  { key: "htmlcss", label: "HTML/CSS" },
  { key: "javascript", label: "JavaScript" },
];

function SelectField({ onFieldSelected, onLevelSelected }) {
  const [field, setField] = useState(null);
  const [progLangs, setProgLangs] = useState([]);      // 선택한 언어 리스트 (key 배열)
  const [progLangStep, setProgLangStep] = useState(false); // 언어선택 UI 노출용

  // 분야 선택
  const handleFieldClick = (selectedField) => {
    setField(selectedField);
    if (onFieldSelected) onFieldSelected(selectedField);

    if (selectedField === "programming") {
      setProgLangStep(true); // 코딩 분야 → 언어 선택 단계로
    } else {
      setProgLangStep(false);
      setProgLangs([]);
    }
  };

  // 언어 체크박스 변경
  const handleLangChange = (key, checked) => {
    setProgLangs((prev) =>
      checked
        ? [...prev, key]
        : prev.filter((k) => k !== key)
    );
  };

  // 언어 선택 후 [다음] 버튼
  const handleLangNext = () => {
    setProgLangStep(false);
  };

  // 레벨 선택 (Beginner, Intermediate, Advanced, Test)
  const handleLevelClick = (level) => {
    if (field === "programming") {
      // label 값으로 변환
      const selectedLabels = LANGUAGES.filter(l => progLangs.includes(l.key)).map(l => l.label);
      if (onLevelSelected) onLevelSelected({ field, languages: selectedLabels }, level);
    } else {
      if (onLevelSelected) onLevelSelected(field, level);
    }
  };

  // UI 렌더링 분기
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
      ) : field === "programming" && progLangStep ? (
        <>
          <h2 className="select-title">공부하기를 원하는 프로그래밍 언어를 선택하세요</h2>
          <div style={{ margin: "1.1rem 0 1.5rem" }}>
            {LANGUAGES.map((lang) => (
              <label key={lang.key} style={{ display: "block", fontSize: "1.05rem", marginBottom: 7 }}>
                <input
                  type="checkbox"
                  checked={progLangs.includes(lang.key)}
                  onChange={e => handleLangChange(lang.key, e.target.checked)}
                  style={{ marginRight: 8 }}
                />
                {lang.label}
              </label>
            ))}
          </div>
          <button
            className="level-btn"
            style={{ marginTop: 18, minWidth: 120 }}
            disabled={progLangs.length === 0}
            onClick={handleLangNext}
          >
            다음
          </button>
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
