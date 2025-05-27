import React from "react";

const themes = [
  { value: "light", label: "라이트" },
  { value: "dark", label: "다크" },
  { value: "gradient", label: "그라데이션" },
];

function ThemeSelector({ current, onChange }) {
  return (
    <select
      value={current}
      onChange={e => onChange(e.target.value)}
      style={{
        margin: "0 1rem",
        padding: "0.5rem",
        borderRadius: "8px",
        border: "1px solid var(--accent)",
        background: "var(--bg)",
        color: "var(--text)",
        fontSize: "1rem",
        boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
      }}
    >
      {themes.map(theme => (
        <option key={theme.value} value={theme.value}>
          {theme.label}
        </option>
      ))}
    </select>
  );
}

export default ThemeSelector;
