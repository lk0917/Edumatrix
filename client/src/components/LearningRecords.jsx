import React, { useState, useEffect, useRef } from "react";
import SidebarMenu from "./SidebarMenu";
import ChatbotSidebar from "./ChatbotSidebar";
import "../index.css";



// 로컬스토리지 유틸
/*function getLocalData() {
  const data = localStorage.getItem("learning-posts-v2");
  try {
    return data ? JSON.parse(data) : { categories: ["기본"], posts: [] };
  } catch {
    return { categories: ["기본"], posts: [] };
  }
}
function setLocalData(data) {
  localStorage.setItem("learning-posts-v2", JSON.stringify(data));
}*/

// 시간 포맷 유틸
function getDateString(date) {
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d
    .getDate()
    .toString()
    .padStart(2, "0")}`;
}
function getTimeString(date) {
  return new Date(date).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}
function LearningRecords({ onMenuClick }) {
  // 사이드바/챗봇 열림 상태
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  // 전체 데이터 상태
    const [categories, setCategories] = useState(["기본"]);
    const [posts, setPosts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", category: "" });
  const [editPostId, setEditPostId] = useState(null);

  // 카테고리 생성
  const [showCatInput, setShowCatInput] = useState(false);
  const [newCat, setNewCat] = useState("");

  // 포스트 상세보기
  const [viewPost, setViewPost] = useState(null);

  // 카테고리 팝업 메뉴 상태
  const [catMenuIdx, setCatMenuIdx] = useState(null);
  const [catMenuPos, setCatMenuPos] = useState({ x: 0, y: 0 }); // 좌표
  const [catEditIdx, setCatEditIdx] = useState(null);
  const [catEditVal, setCatEditVal] = useState("");

  // 팝업 외부 클릭 닫기 ref
    const catMenuRef = useRef(null);

 //MongoDB 연동 -> TEST후 안되면 주석 처리 후 로컬스토리지 유틸 재적용해주세요.
    useEffect(() => {
  const user_id = localStorage.getItem("user_id");
  if (!user_id) return;

  // 글 목록 불러오기
  fetch(`http://localhost:3001/api/records/${user_id}`)
    .then(res => res.json())
    .then(data => {
      const formatted = data.map(item => ({
        id: item._id,
        title: item.subject,
        content: item.memo,
        category: item.category ?? "기본",
        date: getTimeString(item.date),
      }));
      setPosts(formatted);
    })
    .catch(err => console.error("MongoDB 글 불러오기 실패:", err));

  // 카테고리 목록 불러오기
  fetch(`http://localhost:3001/api/user-categories/${user_id}`)
    .then(res => res.json())
    .then(data => setCategories(data))
    .catch(err => console.error("MongoDB 카테고리 불러오기 실패:", err));
}, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (catMenuRef.current && !catMenuRef.current.contains(e.target)) setCatMenuIdx(null);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [catMenuRef, catMenuIdx]);

  // 카테고리 추가
const handleAddCategory = async () => {
  const trimmed = newCat.trim();
  if (!trimmed || categories.includes(trimmed)) return;

  const user_id = localStorage.getItem("user_id");

  try {
    const res = await fetch(`http://localhost:3001/api/user-categories/${user_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newCategory: trimmed })
    });
    const updated = await res.json();
    setCategories(updated);
    setCurrentCategory(trimmed);
  } catch (err) {
    console.error("카테고리 추가 실패:", err);
  }

  setNewCat("");
  setShowCatInput(false);
};

  // 카테고리명 변경
const handleRenameCategory = async (idx) => {
  const trimmed = catEditVal.trim();
  const oldCategory = categories[idx];
  if (!trimmed || categories.includes(trimmed)) return;

  const user_id = localStorage.getItem("user_id");

  try {
    const res = await fetch(`http://localhost:3001/api/user-categories/${user_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldCategory, newCategory: trimmed })
    });
    const updated = await res.json();
    setCategories(updated);
    setPosts(posts.map(p => p.category === oldCategory ? { ...p, category: trimmed } : p));
    setCurrentCategory(trimmed);
  } catch (err) {
    console.error("카테고리명 변경 실패:", err);
  }

  setCatEditIdx(null);
  setCatMenuIdx(null);
  setCatEditVal("");
};

  // 카테고리 삭제
  const handleDeleteCategory = async (idx) => {
  const cat = categories[idx];
  if (cat === "기본") return alert("기본 카테고리는 삭제할 수 없습니다.");
  if (posts.some(p => p.category === cat)) return alert("이 카테고리에 글이 있어 삭제할 수 없습니다.");

  const user_id = localStorage.getItem("user_id");

  try {
  const res = await fetch(`http://localhost:3001/api/user-categories/${user_id}/delete`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ targetCategory: cat })
    });
    const updated = await res.json();
    setCategories(updated);
    setCurrentCategory(updated[0] || "기본");
  } catch (err) {
    console.error("카테고리 삭제 실패:", err);
  }

  setCatMenuIdx(null);
};

  // 글쓰기 버튼/취소
  const openForm = () => {
    setEditPostId(null);
    setForm({ title: "", content: "", category: currentCategory });
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setEditPostId(null);
    setForm({ title: "", content: "", category: currentCategory });
  };

  // 글 작성/수정
    const handlePost = async (e) => {
        e.preventDefault();
        const user_id = localStorage.getItem("user_id");

        const trimmedTitle = form.title.trim();
        if (!trimmedTitle || !form.content.trim()) return;

        try {
            await fetch("http://localhost:3001/api/records", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id,
                    date: new Date(),
                    subject: form.title,
                    status: "완료",
                    memo: form.content,
                    category: form.category
                })
            });
            window.location.reload(); // 새로고침으로 목록 반영
        } catch (err) {
            console.error("기록 추가 실패:", err);
        }
    };


  // 글 삭제
  const handleDelete = async (post) => {
  if (!window.confirm("정말 삭제하시겠습니까?")) return;

  try {
    await fetch(`http://localhost:3001/api/records/${post.id}`, {
      method: "DELETE"
    });

    setPosts((prev) => prev.filter((p) => p.id !== post.id));
    setViewPost(null);
  } catch (err) {
    console.error("글 삭제 실패:", err);
    alert("삭제 중 오류가 발생했습니다.");
  }
};

  // 글 수정 진입
  const handleEdit = (post) => {
    setForm({
      title: post.title,
      content: post.content,
      category: post.category,
    });
    setEditPostId(post.id);
    setShowForm(true);
    setViewPost(null);
  };

  // 현재 카테고리의 포스트 목록만
  const filteredPosts = posts
    .filter((p) => p.category === currentCategory)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="edumatrix-root" style={{ color: "var(--text)", background: "var(--bg)", minHeight: "100vh" }}>
      {/* 사이드/챗봇 */}
      <SidebarMenu
        open={leftOpen}
        onClose={() => setLeftOpen(false)}
        onMenuClick={(key) => {
          setLeftOpen(false);
          if (onMenuClick) onMenuClick(key);
        }}
      />
      <ChatbotSidebar open={rightOpen} onClose={() => setRightOpen(false)} />

      {/* 네비게이션 바 (카테고리) */}
      <nav
        style={{
          width: "100vw",
          background: "var(--sidebar-bg)",
          borderBottom: "1.2px solid var(--input-border)",
          position: "sticky",
          top: 0,
          zIndex: 5,
          padding: "0.5rem 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="nav-cat-center-wrap"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "var(--sidebar-title)",
            maxWidth: 540,
            margin: "0 auto",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          {categories.map((cat, idx) => (
            <div key={cat} style={{ position: "relative", display: "inline-block" }}>
              {catEditIdx === idx ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRenameCategory(idx);
                  }}
                  style={{ display: "inline" }}
                >
                  <input
                    autoFocus
                    value={catEditVal}
                    onChange={e => setCatEditVal(e.target.value)}
                    onBlur={() => setCatEditIdx(null)}
                    style={{
                      fontSize: "1.05rem",
                      borderRadius: 6,
                      padding: "0.3em 0.7em",
                      border: "1px solid var(--input-border)",
                      outline: "none",
                      width: 80,
                      background: "var(--input-bg)",
                      color: "var(--input-text)",
                    }}
                    maxLength={14}
                  />
                </form>
              ) : (
                <button
                  className="nav-cat-btn"
                  style={{
                    background:
                      currentCategory === cat
                        ? "var(--button-bg)"
                        : "var(--button-alt-bg, #f3f5fa)",
                    color:
                      currentCategory === cat
                        ? "var(--button-text)"
                        : "var(--sidebar-title, #444)",
                    border: "none",
                    borderRadius: 8,
                    padding: "0.5em 1.15em",
                    fontWeight: 600,
                    fontSize: "1.01rem",
                    cursor: "pointer",
                    marginRight: 2,
                  }}
                  onClick={() => setCurrentCategory(cat)}
                  onContextMenu={e => {
                    e.preventDefault();
                    setCatMenuIdx(idx);
                    setCatMenuPos({ x: e.clientX, y: e.clientY });
                  }}
                >
                  {cat}
                </button>
              )}
              {/* 팝업 메뉴: 우클릭 시에만 표시 */}
              {catMenuIdx === idx && (
                <div
                  ref={catMenuRef}
                  style={{
                    position: "fixed",
                    left: catMenuPos.x,
                    top: catMenuPos.y,
                    minWidth: 110,
                    background: "#222f",
                    borderRadius: 8,
                    boxShadow: "0 2px 12px #0002",
                    zIndex: 100,
                    padding: "0.5em 0.3em",
                  }}
                >
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fff",
                      padding: "0.5em 1em",
                      textAlign: "left",
                      width: "100%",
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setCatEditIdx(idx);
                      setCatEditVal(cat);
                      setCatMenuIdx(null);
                    }}
                  >
                    이름 변경
                  </button>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: cat === "기본" ? "#ccc" : "#ef6a6a",
                      padding: "0.5em 1em",
                      textAlign: "left",
                      width: "100%",
                      fontSize: "1rem",
                      cursor: cat === "기본" ? "not-allowed" : "pointer",
                    }}
                    disabled={cat === "기본"}
                    onClick={() => handleDeleteCategory(idx)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          ))}
          {showCatInput ? (
            <form
              style={{ display: "inline", marginLeft: 3 }}
              onSubmit={e => { e.preventDefault(); handleAddCategory(); }}
            >
              <input
                autoFocus
                type="text"
                value={newCat}
                onChange={e => setNewCat(e.target.value)}
                onBlur={() => setShowCatInput(false)}
                style={{
                  fontSize: "1.05rem",
                  borderRadius: 6,
                  padding: "0.3em 0.7em",
                  border: "1px solid var(--input-border)",
                  outline: "none",
                  width: 82,
                  color: "var(--input-text)",
                  background: "var(--input-bg)",
                }}
                maxLength={14}
                placeholder="카테고리명"
              />
            </form>
          ) : (
            <button
              aria-label="카테고리 추가"
              style={{
                marginLeft: 3,
                background: "#e3eafc",
                color: "#5187ea",
                border: "none",
                borderRadius: 8,
                width: 30,
                height: 30,
                fontWeight: 900,
                fontSize: "1.15rem",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowCatInput(true);
                setNewCat("");
              }}
            >
              +
            </button>
          )}
        </div>
      </nav>

      {/* 글쓰기 버튼 */}
      <div style={{
        maxWidth: 540, margin: "1.6rem auto 0",
        display: "flex", justifyContent: "flex-end"
      }}>
        <button
          className="login-btn"
          style={{
            fontSize: "1.08rem",
            borderRadius: 9,
            fontWeight: 700,
            padding: "0.5em 1.6em",
            background: "var(--button-bg)",
            color: "var(--button-text)",
          }}
          onClick={openForm}
        >
          글쓰기
        </button>
      </div>

      {/* 글쓰기/수정 폼 */}
      {showForm && (
        <div
          style={{
            background: "rgba(24,32,51,0.18)",
            position: "fixed",
            inset: 0,
            zIndex: 99,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={closeForm}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handlePost}
            style={{
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
              borderRadius: 14,
              padding: "2.1rem 1.8rem",
              width: 800,
              maxWidth: "98vw",
              display: "flex",
              flexDirection: "column",
              gap: 17,
              position: "relative",
              color: "var(--text)",
            }}
          >
            <div style={{ fontWeight: 600, fontSize: "1.14rem" }}>
              {editPostId ? "글 수정" : `새 글 작성 (${currentCategory})`}
            </div>
            <input
              autoFocus
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="제목"
              required
              maxLength={64}
              style={{
                borderRadius: 8,
                padding: "0.6em 1em",
                fontSize: "1.07rem",
                border: "1.3px solid var(--input-border)",
                background: "var(--input-bg)",
                color: "var(--input-text)",
              }}
            />
            {/* 카테고리 선택 (수정 시 활성화) */}
            <select
              value={form.category || currentCategory}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{
                borderRadius: 7,
                border: "1.2px solid var(--input-border)",
                background: "var(--input-bg)",
                color: "var(--input-text)",
                fontSize: "1.04rem",
                padding: "0.44em 1.1em",
              }}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="오늘의 학습 내용을 자유롭게 입력하세요."
              rows={20}
              required
              style={{
                borderRadius: 8,
                padding: "0.7em 1em",
                fontSize: "1.07rem",
                border: "1.3px solid var(--input-border)",
                background: "var(--input-bg)",
                color: "var(--input-text)",
                resize: "vertical",
                minHeight: 400,
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button
                type="button"
                style={{
                  background: "#f0f1f5",
                  color: "#334",
                  borderRadius: 7,
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  padding: "0.4em 1.15em",
                  border: "none",
                }}
                onClick={closeForm}
              >
                취소
              </button>
              <button
                type="submit"
                className="login-btn"
                style={{
                  borderRadius: 7,
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  padding: "0.45em 1.25em",
                  background: "var(--button-bg)",
                  color: "var(--button-text)",
                }}
              >
                {editPostId ? "수정 완료" : "등록"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 게시글 목록 */}
      <main style={{ margin: "0 auto", maxWidth: 540, padding: "1.4rem 1rem" }}>
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: "center", color: "var(--sidebar-title)", marginTop: 60 }}>
            {currentCategory}에 작성된 글이 없습니다.<br />
            우측 상단 "글쓰기" 버튼을 눌러 첫 글을 작성해보세요.
          </div>
        ) : (
          <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
            {filteredPosts.map((p) => (
              <li
                key={p.id}
                onClick={() => setViewPost(p)}
                style={{
                  background: "var(--card-bg)",
                  borderRadius: 13,
                  boxShadow: "var(--card-shadow)",
                  padding: "1.15rem 1.4rem",
                  marginBottom: 15,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  transition: "box-shadow 0.15s",
                  color: "var(--text)",
                }}
              >
                <div style={{
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  color: "var(--text)"
                }}>
                  {p.title}
                </div>
                <div style={{
                  fontSize: "0.99rem",
                  color: "var(--sidebar-title)",
                  marginTop: 2,
                }}>
                  {p.date}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* 게시글 상세보기 */}
      {viewPost && (
        <div
          style={{
            background: "rgba(16,24,31,0.22)",
            position: "fixed",
            inset: 0,
            zIndex: 99,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setViewPost(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
              borderRadius: 14,
              padding: "2.4rem 2.1rem",
              width: 800,
              maxWidth: "96vw",
              display: "flex",
              flexDirection: "column",
              gap: 13,
              position: "relative",
              color: "var(--text)",
            }}
          >
            <div style={{ fontWeight: 800, fontSize: "1.23rem" }}>
              {viewPost.title}
            </div>
            <div style={{ color: "var(--sidebar-title)", fontSize: "1.05rem" }}>
              <span>{viewPost.date}</span>
              <span style={{ marginLeft: 16, fontWeight: 500, color: "#5ab7fa" }}>
                [{viewPost.category}]
              </span>
            </div>
            <div
              style={{
                borderTop: "1px solid #e3e4ec",
                margin: "7px 0 14px 0",
                paddingTop: 8,
                fontSize: "1.13rem",
                whiteSpace: "pre-line",
                color: "var(--text)",
              }}
            >
              {viewPost.content}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                style={{
                  background: "#f6e1e1",
                  color: "#e44747",
                  borderRadius: 7,
                  padding: "0.41em 1.2em",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "1.01rem",
                }}
                onClick={() => handleDelete(viewPost)}
              >
                삭제
              </button>
              <button
                style={{
                  background: "#e5eaf9",
                  color: "#3869d2",
                  borderRadius: 7,
                  padding: "0.41em 1.2em",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "1.03rem",
                }}
                onClick={() => handleEdit(viewPost)}
              >
                수정
              </button>
              <button
                style={{
                  background: "#edeff6",
                  color: "#2c3953",
                  borderRadius: 7,
                  padding: "0.41em 1.2em",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "1.03rem",
                }}
                onClick={() => setViewPost(null)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LearningRecords;
