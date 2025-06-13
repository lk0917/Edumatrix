import React from "react";
import PropTypes from "prop-types";
import "../index.css"; // 글로벌 스타일 유지

function SidebarMenu({ open, onClose, menuItems, onMenuClick }) {
  // menuItems가 없으면 기본값 사용
  const defaultMenus = [
    { label: "홈", key: "home" },
    { label: "대시보드", key: "dashboard" },
    { label: "학습 기록", key: "records" },
    { label: "설정", key: "settings" },
  ];

  const items = menuItems && menuItems.length ? menuItems : defaultMenus;


  return (
    <aside
      className={`sidebar left${open ? " open" : ""}`}
      style={{
        background: "var(--sidebar-bg)",
        color: "var(--sidebar-text)",
        borderRight: "1px solid var(--sidebar-border)",
        transition: "background 0.2s, color 0.2s",
        zIndex: 120,
      }}
    >
      <button
        className="close-btn"
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "var(--sidebar-text)",
          fontSize: "1.8rem",
          position: "absolute",
          top: 10,
          right: 14,
          cursor: "pointer"
        }}
        aria-label="사이드바 닫기"
      >×</button>
      <nav style={{ marginTop: "2.6rem" }}>
        <h2 style={{ fontSize: "1.15rem", color: "var(--sidebar-title)", marginBottom: "1.5rem" }}>
          Menu
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map(item => (
            <li
              key={item.key}
              style={{
                cursor: "pointer",
                fontWeight: item.key === "dashboard" ? 700 : 500,
                padding: "0.75rem 0 0.75rem 0.4rem",
                borderRadius: "7px",
                color: "var(--sidebar-text)",
                marginBottom: 2,
                transition: "background 0.13s",
              }}
              onClick={() => {
                if (onMenuClick) onMenuClick(item.key);
                if (onClose) onClose();
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = "var(--sidebar-hover)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = "transparent";
              }}
              tabIndex={0}
              role="menuitem"
              aria-label={item.label}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

SidebarMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  menuItems: PropTypes.array,
  onMenuClick: PropTypes.func,
};

export default SidebarMenu;
