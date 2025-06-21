import React, { useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const initialNotes = [
  { id: 1, title: 'JavaScript 기초', content: '' },
  { id: 2, title: '알고리즘 공부', content: '' },
  { id: 3, title: '데이터베이스', content: '' },
  { id: 4, title: '네트워크', content: '' },
];

function StudyNote({ onBack }) {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedId, setSelectedId] = useState(notes[0].id);
  const navigate = useNavigate();

  const selectedNote = notes.find((note) => note.id === selectedId);

  const handleSelect = (id) => setSelectedId(id);

  const handleContentChange = (e) => {
    setNotes(notes.map(note =>
      note.id === selectedId ? { ...note, content: e.target.value } : note
    ));
  };

  const handleAddPage = () => {
    const newId = notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1;
    const newNote = { id: newId, title: `새 페이지 ${newId}`, content: '' };
    setNotes([...notes, newNote]);
    setSelectedId(newId);
  };

  return (
    <div className="study-note-root">
      {/* Sidebar */}
      <aside className="study-note-sidebar">
        <div>
          <h2 className="study-note-title">스터디 노트</h2>
          <ul className="study-note-list">
            {notes.map(note => (
              <li key={note.id}>
                <button
                  onClick={() => handleSelect(note.id)}
                  className={`study-note-list-item${note.id === selectedId ? ' selected' : ''}`}
                >
                  {note.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleAddPage}
          className="study-note-add-page"
        >
          + 새 페이지
        </button>
      </aside>
      {/* Main Note Area */}
      <main className="study-note-main">
        <div className="study-note-detail">
          {/* ← 대시보드로 돌아가기 버튼 */}
          <button
            className="back-button study-note-back"
            onClick={onBack}
          >
            ← 대시보드로 돌아가기
          </button>
          <h2 className="study-note-detail-title">{selectedNote.title}</h2>
          <textarea
            value={selectedNote.content}
            onChange={handleContentChange}
            placeholder="여기에 내용을 작성하세요."
            className="study-note-textarea"
          />
        </div>
      </main>
    </div>
  );
}

export default StudyNote; 