// ThemeSelector.jsx
import React from "react";
import PropTypes from "prop-types";

// 선택 가능한 테마 목록
const themes = [
  { key: "light", label: "라이트" },
  { key: "dark", label: "다크" },
  { key: "gradient", label: "그라데이션" },
];

function ThemeSelector({ current, onChange }) {
  return (
    <div className="theme-selector" style={{ display: "flex", gap: "1.2rem", marginTop: 6 }}>
      {themes.map((theme) => (
        <button
          key={theme.key}
          className={`theme-btn${current === theme.key ? " selected" : ""}`}
          style={{
            padding: "0.7rem 1.4rem",
            borderRadius: 13,
            border: current === theme.key ? "2px solid #446cff" : "1.2px solid #c9d3e8",
            background: current === theme.key ? "#e6ecff" : "#f5f7fa",
            color: current === theme.key ? "#2141aa" : "#222",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "1.08rem",
            transition: "background 0.2s, border 0.2s",
          }}
          onClick={() => onChange(theme.key)}
          type="button"
        >
          {theme.label}
        </button>
      ))}
    </div>
  );
}

ThemeSelector.propTypes = {
  current: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ThemeSelector;
