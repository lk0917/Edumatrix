// SettingsPage.jsx
import React from "react";
import PropTypes from "prop-types";
import ThemeSelector from "./ThemeSelector";
import "../index.css"; 

function SettingsPage({
  currentTheme,
  onChangeTheme,
  onBack,
  backArrow,
  userInfo = {
    username: "testuser",
    name: "홍길동",
    email: "testuser@email.com",
    password: "********",
  },
}) {
  return (
    <div className="edumatrix-root">
      <header className="topbar">
        <button
          className="back-btn"
          onClick={onBack}
          style={{
            marginLeft: 10,
            background: "none",
            border: "none",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={backArrow} alt="뒤로가기" style={{ width: 28, height: 28, objectFit: "contain" }} />
        </button>
        <span style={{ fontWeight: 700, fontSize: "1.2rem", marginLeft: 14 }}>설정</span>
      </header>
      <main className="settings-main" style={{ marginTop: "4.7rem", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
        <section className="settings-section mypage-section" style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.23rem", marginBottom: "1.1rem" }}>마이페이지</h2>
          <div className="mypage-info" style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.03)", padding: "1.5rem" }}>
            <div style={{ marginBottom: "1rem" }}>
              <strong>아이디:</strong> <span>{userInfo.username}</span>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <strong>이름:</strong> <span>{userInfo.name}</span>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <strong>이메일:</strong> <span>{userInfo.email}</span>
            </div>
            <div>
              <strong>비밀번호:</strong> <span>{userInfo.password}</span>
            </div>
          </div>
        </section>
        <section className="settings-section theme-section">
          <h2 style={{ fontSize: "1.23rem", marginBottom: "1.1rem" }}>테마 설정</h2>
          {/* ThemeSelector가 현재 테마와 변경 함수를 props로 받음 */}
          <ThemeSelector current={currentTheme} onChange={onChangeTheme} />
        </section>
      </main>
    </div>
  );
}

SettingsPage.propTypes = {
  currentTheme: PropTypes.string.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  backArrow: PropTypes.string.isRequired,
  userInfo: PropTypes.object,
};

export default SettingsPage;
