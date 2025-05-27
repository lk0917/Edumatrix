import React from "react";
import PropTypes from "prop-types";
import "../index.css"; // 글로벌 스타일 유지

function SidebarMenu({ open, onClose, menuItems }) {
  // menuItems가 없으면 기본값 사용
  const defaultMenus = [
    { label: "홈", key: "home" },
    { label: "대시보드", key: "dashboard" },
    { label: "학습 기록", key: "records" },
    { label: "설정", key: "settings" },
  ];

  const items = menuItems && menuItems.length ? menuItems : defaultMenus;

  return (
    <aside className={`sidebar left${open ? " open" : ""}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <nav>
        <h2>Menu</h2>
        <ul>
          {items.map(item => (
            <li key={item.key}>
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
};

export default SidebarMenu;
