const express = require("express");
const router = express.Router();
const TestQuestion = require("../models/TestQuestion");


router.get("/", async (req, res) => {
  const { field, language, limit } = req.query;
  const query = {};

  if (field) query.field = field;
  if (language) query.language = language;

  try {
    let questions = await TestQuestion.find(query).sort({ difficulty: 1 });
    if (limit) {
      questions = questions.slice(0, parseInt(limit));
    }
    res.json(questions);
  } catch (err) {
    console.error("문제 조회 실패:", err);
    res.status(500).json({ error: "서버 오류: 문제를 불러올 수 없습니다." });
  }
});

module.exports = router;
