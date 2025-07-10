const mongoose = require("mongoose");
const TestQuestion = require("./models/TestQuestion");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const sampleQuestions = [
  // 영어 문제
  {
    field: "english",
    question: "다음 중 'book'의 뜻은?",
    options: ["책", "책상", "의자", "컴퓨터"],
    answer: 0
  },
  {
    field: "english",
    question: "다음 중 올바른 문장은?",
    options: ["He go to school.", "He goes to school.", "He going to school.", "He gone to school."],
    answer: 1
  },
  {
    field: "english",
    question: "I ___ a student.",
    options: ["is", "are", "am", "be"],
    answer: 2
  },

  // Python 문제
  {
    field: "programming",
    language: "Python",
    difficulty: 1,
    question: "Python에서 조건문을 시작하는 키워드는?",
    options: ["if", "when", "case", "switch"],
    answer: 0
  },
  {
    field: "programming",
    language: "Python",
    difficulty: 2,
    question: "Python에서 리스트에 요소를 추가하는 함수는?",
    options: ["push()", "append()", "insert()", "add()"],
    answer: 1
  },
  {
    field: "programming",
    language: "Python",
    difficulty: 3,
    question: "Python에서 반복을 중단하는 키워드는?",
    options: ["stop", "exit", "break", "end"],
    answer: 2
  },

  // JavaScript 문제
  {
    field: "programming",
    language: "JavaScript",
    difficulty: 1,
    question: "JavaScript에서 변수 선언 키워드가 아닌 것은?",
    options: ["var", "let", "const", "define"],
    answer: 3
  },
  {
    field: "programming",
    language: "JavaScript",
    difficulty: 2,
    question: "JavaScript에서 함수를 선언하는 키워드는?",
    options: ["function", "func", "def", "lambda"],
    answer: 0
  },
  {
    field: "programming",
    language: "JavaScript",
    difficulty: 3,
    question: "다음 중 올바른 배열 선언은?",
    options: ["let arr = []", "let arr = {}", "arr = list()", "arr = new Array{}"],
    answer: 0
  },

  // C++ 문제
  {
    field: "programming",
    language: "C++",
    difficulty: 1,
    question: "C++에서 출력에 사용하는 객체는?",
    options: ["cin", "cout", "printf", "println"],
    answer: 1
  },
  {
    field: "programming",
    language: "C++",
    difficulty: 2,
    question: "C++에서 주석을 작성할 때 사용하는 기호는?",
    options: ["##", "//", "--", "**"],
    answer: 1
  },
  {
    field: "programming",
    language: "C++",
    difficulty: 3,
    question: "다음 중 C++의 반복문 키워드는?",
    options: ["do", "for", "repeat", "loop"],
    answer: 1
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    await TestQuestion.deleteMany({});
    await TestQuestion.insertMany(sampleQuestions);
    console.log("다양한 분야의 샘플 문제 삽입 완료");
    mongoose.disconnect();
  } catch (err) {
    console.error("삽입 실패:", err);
  }
}

seed();
