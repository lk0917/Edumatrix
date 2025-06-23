// app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL 연결 설정
const pool = mysql.createPool({
  host: "localhost",      // DB 주소 (로컬일 경우 localhost, AWS면 엔드포인트)
  user: "root",           // DB 계정
  password: "yourpassword", // DB 비밀번호
  database: "learning",   // 사용할 DB명
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// (예시) 테이블: posts
// CREATE TABLE posts (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   title VARCHAR(128) NOT NULL,
//   content TEXT,
//   category VARCHAR(64),
//   date VARCHAR(12),
//   time VARCHAR(8)
// );

// 모든 게시글 목록 가져오기 (카테고리별)
app.get("/api/posts", (req, res) => {
  const { category } = req.query;
  let sql = "SELECT * FROM posts";
  let values = [];
  if (category) {
    sql += " WHERE category = ?";
    values.push(category);
  }
  sql += " ORDER BY date DESC, time DESC";
  pool.query(sql, values, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 게시글 등록
app.post("/api/posts", (req, res) => {
  const { title, content, category, date, time } = req.body;
  if (!title || !category || !date || !time) {
    return res.status(400).json({ error: "필수 입력값이 누락됨" });
  }
  pool.query(
    "INSERT INTO posts (title, content, category, date, time) VALUES (?, ?, ?, ?, ?)",
    [title, content, category, date, time],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      pool.query(
        "SELECT * FROM posts WHERE id = ?",
        [result.insertId],
        (err2, rows) => {
          if (err2) return res.status(500).json({ error: err2.message });
          res.status(201).json(rows[0]);
        }
      );
    }
  );
});

// 게시글 수정
app.put("/api/posts/:id", (req, res) => {
  const { title, content, category, date, time } = req.body;
  pool.query(
    "UPDATE posts SET title = ?, content = ?, category = ?, date = ?, time = ? WHERE id = ?",
    [title, content, category, date, time, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.sendStatus(200);
    }
  );
});

// 게시글 삭제
app.delete("/api/posts/:id", (req, res) => {
  pool.query("DELETE FROM posts WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.sendStatus(204);
  });
});

// 카테고리 조회 (고도화 가능)
app.get("/api/categories", (req, res) => {
  pool.query("SELECT DISTINCT category FROM posts", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(row => row.category));
  });
});

// 서버 실행
const PORT = 4000;
app.listen(PORT, () => console.log(`서버 실행중: http://localhost:${PORT}`));
