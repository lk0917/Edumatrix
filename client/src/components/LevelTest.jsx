import React, { useState, useMemo } from "react";
import "../index.css"; 

// 영어 문제 10문항
const englishQuestions = [
  // 초급 (1~3)
  {
    question: "다음 중 ‘apple’의 뜻은?",
    options: ["사과", "포도", "바나나", "배"],
    answer: 0,
  },
  {
    question: "She ___ to the library every day. (빈칸에 들어갈 알맞은 말은?)",
    options: ["go", "goes", "gone", "going"],
    answer: 1,
  },
  {
    question: "다음 중 ‘친구’에 해당하는 영어 단어는?",
    options: ["Friend", "Tree", "Book", "Table"],
    answer: 0,
  },
  // 초중급 (4~6)
  {
    question: "다음 중 알맞은 과거형은?\nHe ___ a letter yesterday.",
    options: ["write", "writes", "wrote", "written"],
    answer: 2,
  },
  {
    question: "‘책상 위에 책이 있다’를 영어로 올바르게 고르세요.",
    options: [
      "There is a book on the desk.",
      "There are desk on the book.",
      "Book is desk on.",
      "The desk is in the book.",
    ],
    answer: 0,
  },
  {
    question: "I have ___ umbrella. (a/an 중 알맞은 것은?)",
    options: ["a", "an"],
    answer: 1,
  },
  // 중급 (7~8)
  {
    question: "He has lived in Seoul ___ 2010. (빈칸에 들어갈 알맞은 말은?)",
    options: ["for", "since", "during", "at"],
    answer: 1,
  },
  {
    question: "다음 중 수동태 문장은?",
    options: [
      "He eats an apple.",
      "The apple is eaten by him.",
      "He is eating an apple.",
      "He will eat an apple.",
    ],
    answer: 1,
  },
  // 고급 (9~10)
  {
    question: "‘나는 그가 오기를 기대한다’ 올바른 영어 표현은?",
    options: [
      "I expect him come.",
      "I expect him to come.",
      "I expect he comes.",
      "I am expect him come.",
    ],
    answer: 1,
  },
  {
    question: "다음 중 관계대명사가 사용된 문장은?",
    options: [
      "This is the book which I bought yesterday.",
      "I bought a book yesterday.",
      "The book is very interesting.",
      "Yesterday, I bought a book.",
    ],
    answer: 0,
  },
];

// 각 언어별 10문항씩(난이도별 1~10) 준비
const programmingQuestionsByLanguage = {
  Python: [
    {
      question: "Python에서 리스트의 길이를 구하는 함수는?",
      options: ["size()", "count()", "len()", "length()"],
      answer: 2,
    },
    {
      question: "Python에서 주석을 만드는 방법은?",
      options: ["//", "#", "--", "/* */"],
      answer: 1,
    },
    {
      question: "Python에서 반복문에 사용되는 키워드는?",
      options: ["repeat", "for", "loop", "iterate"],
      answer: 1,
    },
    {
      question: "Python에서 변수 선언에 필요한 키워드는?",
      options: ["let", "var", "define", "없음(자동)"],
      answer: 3,
    },
    {
      question: "Python에서 튜플을 만드는 방법은?",
      options: ["[]", "{}", "()", "<>"],
      answer: 2,
    },
    {
      question: "Python에서 'Hello'를 출력하는 코드는?",
      options: ["echo 'Hello'", "System.out('Hello')", "console.log('Hello')", "print('Hello')"],
      answer: 3,
    },
    {
      question: "Python에서 딕셔너리의 모든 key를 가져오는 메소드는?",
      options: [
        "dict.all()",
        "dict.keys()",
        "dict.items()",
        "dict.get()"
      ],
      answer: 1,
    },
    {
      question: "다음 중 올바른 함수 정의는?",
      options: [
        "function myFunc[]",
        "def myFunc():",
        "func myFunc() {}",
        "define myFunc()",
      ],
      answer: 1,
    },
    {
      question: "Python의 내장 자료형이 아닌 것은?",
      options: ["set", "list", "tree", "dict"],
      answer: 2,
    },
    {
      question: "Python에서 예외 처리를 위한 키워드는?",
      options: ["try-except", "catch", "handle", "protect"],
      answer: 0,
    },
  ],
  "C/C++": [
    {
      question: "C에서 문자열을 출력하는 함수는?",
      options: ["echo()", "printf()", "cout<<", "System.out.println()"],
      answer: 1,
    },
    {
      question: "C++에서 입출력에 사용하는 객체는?",
      options: ["cin/cout", "scanf/printf", "input/output", "read/write"],
      answer: 0,
    },
    {
      question: "포인터를 선언하는 기호는?",
      options: ["&", "*", "#", "@@"],
      answer: 1,
    },
    {
      question: "C에서 조건문을 만드는 키워드는?",
      options: ["when", "if", "select", "case"],
      answer: 1,
    },
    {
      question: "C++에서 클래스 정의에 사용하는 키워드는?",
      options: ["define", "struct", "class", "object"],
      answer: 2,
    },
    {
      question: "C에서 main 함수의 반환형은?",
      options: ["void", "main", "int", "function"],
      answer: 2,
    },
    {
      question: "C에서 배열의 인덱스는 어디서 시작?",
      options: ["1", "0", "2", "-1"],
      answer: 1,
    },
    {
      question: "C++에서 참조자 선언은 어떻게?",
      options: ["*", "&", "#", "$"],
      answer: 1,
    },
    {
      question: "C/C++에서 반복문에 해당하는 것은?",
      options: ["repeat", "for", "do-while", "all of these"],
      answer: 3,
    },
    {
      question: "C에서 변수 선언에 필요한 자료형은?",
      options: ["자료형 생략", "자료형 명시", "var", "let"],
      answer: 1,
    },
  ],
  Java: [
    {
      question: "Java에서 문자열을 출력하는 메소드는?",
      options: ["console.log()", "System.out.println()", "echo()", "print()"],
      answer: 1,
    },
    {
      question: "Java에서 클래스를 정의하는 키워드는?",
      options: ["define", "function", "class", "object"],
      answer: 2,
    },
    {
      question: "Java에서 main 함수 선언 형태는?",
      options: [
        "public static void main(String[] args)",
        "def main():",
        "function main()",
        "void main()",
      ],
      answer: 0,
    },
    {
      question: "Java에서 배열의 길이 확인 방법은?",
      options: ["arr.length()", "length(arr)", "arr.size()", "arr.length"],
      answer: 3,
    },
    {
      question: "Java에서 예외 처리를 위한 키워드는?",
      options: ["try-catch", "except", "handle", "protect"],
      answer: 0,
    },
    {
      question: "Java에서 상속에 사용하는 키워드는?",
      options: ["extend", "extends", "inherit", "base"],
      answer: 1,
    },
    {
      question: "Java에서 자료형이 아닌 것은?",
      options: ["int", "float", "list", "char"],
      answer: 2,
    },
    {
      question: "Java에서 메소드 오버로딩이란?",
      options: [
        "같은 이름, 다른 매개변수 메소드 여러 개 선언",
        "메소드 이름 바꾸기",
        "메소드 삭제",
        "메소드 복사",
      ],
      answer: 0,
    },
    {
      question: "Java에서 객체 생성시 사용하는 키워드는?",
      options: ["create", "make", "new", "object"],
      answer: 2,
    },
    {
      question: "Java에서 final 키워드는 무엇을 의미?",
      options: [
        "수정 가능",
        "상속 가능",
        "상수/변경 불가",
        "초기화 미필요",
      ],
      answer: 2,
    },
  ],
  "HTML/CSS": [
    {
      question: "HTML에서 링크를 만들 때 사용하는 태그는?",
      options: ["<a>", "<link>", "<url>", "<href>"],
      answer: 0,
    },
    {
      question: "CSS에서 글자색을 지정하는 속성은?",
      options: ["background", "font-color", "color", "text"],
      answer: 2,
    },
    {
      question: "HTML에서 이미지 삽입 태그는?",
      options: ["<img>", "<image>", "<src>", "<pic>"],
      answer: 0,
    },
    {
      question: "CSS에서 외부 스타일시트 연결 방법은?",
      options: ["<style>", "<link>", "<css>", "<import>"],
      answer: 1,
    },
    {
      question: "HTML에서 표를 만드는 태그는?",
      options: ["<tr>", "<table>", "<td>", "<tab>"],
      answer: 1,
    },
    {
      question: "CSS에서 margin은 무엇을 조절?",
      options: ["글꼴", "여백", "색상", "정렬"],
      answer: 1,
    },
    {
      question: "HTML에서 제목 태그는?",
      options: ["<head>", "<header>", "<title>", "<h1>~<h6>"],
      answer: 3,
    },
    {
      question: "CSS에서 전체 선택자를 의미하는 기호는?",
      options: [".", "#", "*", "!"],
      answer: 2,
    },
    {
      question: "HTML에서 폼 입력을 위한 태그는?",
      options: ["<form>", "<input>", "<button>", "all of these"],
      answer: 3,
    },
    {
      question: "HTML/CSS에서 반응형 웹에 쓰이는 단위가 아닌 것은?",
      options: ["em", "rem", "vw", "sec"],
      answer: 3,
    },
  ],
  JavaScript: [
    {
      question: "JavaScript에서 변수 선언에 사용하는 키워드는?",
      options: ["int", "var", "dim", "letin"],
      answer: 1,
    },
    {
      question: "JavaScript에서 const로 선언한 변수의 특징은?",
      options: [
        "값을 수정할 수 없다",
        "자료형이 바뀔 수 있다",
        "배열은 수정 불가",
        "변수 삭제됨"
      ],
      answer: 0,
    },
    {
      question: "JavaScript에서 함수 선언 키워드가 아닌 것은?",
      options: ["function", "def", "=>", "const"],
      answer: 1,
    },
    {
      question: "다음 중 배열(Array)의 올바른 선언은?",
      options: [
        "let arr = [1, 2, 3];",
        "let arr = 1,2,3;",
        "let arr = {1, 2, 3};",
        "let arr = (1, 2, 3);",
      ],
      answer: 0,
    },
    {
      question: "React에서 상태를 관리하는 기본 Hook은?",
      options: [
        "useEffect",
        "useCallback",
        "useState",
        "useRef"
      ],
      answer: 2,
    },
    {
      question: "JavaScript에서 화살표 함수의 표기는?",
      options: [
        "function()",
        "=>",
        "<-",
        "**"
      ],
      answer: 1,
    },
    {
      question: "JavaScript에서 let, const와 같은 선언은 무엇을 의미?",
      options: [
        "함수 선언",
        "변수 선언",
        "상수 선언",
        "배열 선언"
      ],
      answer: 1,
    },
    {
      question: "JavaScript에서 NaN이란?",
      options: [
        "Null and None",
        "Not a Number",
        "New Array Node",
        "No Any Number"
      ],
      answer: 1,
    },
    {
      question: "JavaScript에서 동등(==)과 일치(===)의 차이는?",
      options: [
        "동등은 값 비교, 일치는 값+자료형 비교",
        "반대",
        "차이 없음",
        "일치가 더 느림"
      ],
      answer: 0,
    },
    {
      question: "JavaScript에서 객체를 만드는 방법은?",
      options: [
        "let obj = {};",
        "let obj = [];", 
        "let obj = () => {};", 
        "let obj = new Object[];"
      ],
      answer: 0,
    },
  ]
};

// key→label 변환 매핑
const KEY_TO_LABEL = {
  python: "Python",
  cpp: "C/C++",
  java: "Java",
  htmlcss: "HTML/CSS",
  javascript: "JavaScript",
};

// 레벨 결과 함수 (80% 이상: Advanced, 30% 미만: Beginner, 그 외: Intermediate)
const resultLevel = (score, total) => {
  const percent = total === 0 ? 0 : score / total;
  if (percent >= 0.8) return "Advanced";
  if (percent < 0.3) return "Beginner";
  return "Intermediate";
};

function LevelTest({ field, onBack, onComplete, isNewUser }) {
  // 사용자의 언어 선택에 따라 문제풀 결정 (영어/프로그래밍 구분)
  const questions = useMemo(() => {
    // 영어면 10문항 그대로
    if (field === "english") return englishQuestions;

    // 프로그래밍: { field: "programming", languages: [...] }
    if (typeof field === "object" && field.field === "programming") {
      // 1. 소문자 key값이 들어올 경우 label로 변환
      let langs = Array.isArray(field.languages) ? field.languages : [];
      langs = langs.map(l => KEY_TO_LABEL[l] || l); // label만 남게 보정

      let pool = [];

      langs.forEach((lang) => {
        if (Array.isArray(programmingQuestionsByLanguage[lang])) {
          programmingQuestionsByLanguage[lang].forEach((q, idx) => {
            pool.push({ ...q, __lang: lang, __difficulty: idx + 1 });
          });
        }
      });

      // 언어 1개만 선택 시 그대로 10개 뽑기
      if (langs.length === 1 && pool.length >= 10) {
        return pool.slice(0, 10);
      }
      // 언어 여러개 선택: 난이도별 1~10을 균등하게 섞어 10개 추출
      if (langs.length > 1 && pool.length > 0) {
        let selected = [];
        for (let diff = 1; diff <= 10; diff++) {
          // diff 레벨 문제 중 무작위 언어 하나 선택
          const diffPool = pool.filter(q => q.__difficulty === diff);
          if (diffPool.length > 0) {
            const pick = diffPool[Math.floor(Math.random() * diffPool.length)];
            selected.push(pick);
          }
        }
        // 10개 미만이면 pool에서 중복 없이 추가
        let remain = pool.filter(q => !selected.includes(q));
        while (selected.length < 10 && remain.length > 0) {
          const pick = remain[Math.floor(Math.random() * remain.length)];
          selected.push(pick);
          remain = remain.filter(q => q !== pick);
        }
        // 만약 여전히 10개 미만이면 pool에서 반복적으로 추가(최후의 방어)
        while (selected.length < 10 && pool.length > 0) {
          selected.push(pool[selected.length % pool.length]);
        }
        return selected.slice(0, 10);
      }
      // 혹시 pool이 10개 미만: (언어 1개, 문항수 부족 등)
      if (pool.length > 0 && pool.length < 10) {
        // 부족한 만큼 처음부터 반복해 채우기
        const repeat = [];
        for (let i = 0; i < 10; i++) {
          repeat.push(pool[i % pool.length]);
        }
        return repeat;
      }
      // 완전 예외
      return [];
    }
    // 나머지 예외처리
    return [];
  }, [field]);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // field가 올바르지 않으면 에러 안내
  if (!questions.length) {
    return (
      <div className="leveltest-root">
        <div className="leveltest-box">
          <div style={{ color: "#d44", fontWeight: 700 }}>
            유효하지 않은 분야입니다.
          </div>
          <button className="leveltest-back" style={{ marginTop: 20 }} onClick={onBack}>← 이전</button>
        </div>
      </div>
    );
  }

  // 답변 체크
  const handleOption = (idx) => {
    if (submitted) return;
    setSelected((prev) => {
      const copy = [...prev];
      copy[current] = idx;
      return copy;
    });
  };

  // 다음 문제
  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  // 이전 문제
  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  // 제출
  const handleSubmit = () => {
    const correct = questions.reduce(
      (acc, q, idx) => acc + (selected[idx] === q.answer ? 1 : 0),
      0
    );
    setScore(correct);
    setSubmitted(true);

    setTimeout(() => {
      // 결과 전달 및 추천 화면으로 이동
      if (onComplete) onComplete(resultLevel(correct, questions.length), isNewUser);
    }, 1600);
  };

  // 현재 문제 안전하게 렌더링
  const currentQuestion = questions[current];

  return (
    <div className="leveltest-root">
      <div className="leveltest-box">
        <div style={{ marginBottom: "1.2rem" }}>
          <button className="leveltest-back" onClick={onBack}>←</button>
          <span className="leveltest-title">
            {/* 영어/프로그래밍(+언어) 구분 */}
            {field === "english"
              ? "영어 레벨 테스트"
              : typeof field === "object" && field.field === "programming"
              ? `프로그래밍 레벨 테스트`
              : "코딩 레벨 테스트"}
          </span>
        </div>
        {!submitted ? (
          currentQuestion ? (
            <>
              <div className="leveltest-q">
                <span style={{ color: "#8fa4c4", fontSize: "1.05rem" }}>
                  Q{current + 1}.
                </span>{" "}
                {currentQuestion.question}
                {currentQuestion.__lang && (
                  <span style={{
                    marginLeft: 10,
                    color: "#999",
                    fontSize: "0.95em"
                  }}>
                    ({currentQuestion.__lang})
                  </span>
                )}
              </div>
              <div className="leveltest-options">
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`leveltest-opt-btn${selected[current] === idx ? " selected" : ""}`}
                    onClick={() => handleOption(idx)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: "1.1rem", display: "flex", gap: 12, justifyContent: "center" }}>
                <button
                  className="leveltest-nav"
                  onClick={handlePrev}
                  disabled={current === 0}
                >이전</button>
                <button
                  className="leveltest-nav"
                  onClick={handleNext}
                  disabled={
                    current === questions.length - 1 ||
                    selected[current] === null
                  }
                >다음</button>
                <button
                  className="leveltest-submit"
                  disabled={selected.includes(null)}
                  onClick={handleSubmit}
                  style={{ marginLeft: 10 }}
                >
                  제출
                </button>
              </div>
              <div style={{ marginTop: "0.8rem", color: "#8894aa", fontSize: "0.97rem" }}>
                {current + 1} / {questions.length}
              </div>
            </>
          ) : (
            <div style={{ color: "#d44", fontWeight: 700 }}>
              문항을 불러올 수 없습니다.
            </div>
          )
        ) : (
          <div className="leveltest-result">
            <div style={{ fontWeight: 700, fontSize: "1.21rem", color: "#3878d7", marginBottom: "1rem" }}>
              결과: {resultLevel(score, questions.length)}
            </div>
            <div style={{ color: "#222", marginBottom: "0.9rem" }}>
              정답: {score}개 / {questions.length}문항
            </div>
            <div style={{ color: "#888" }}>
              곧 추천 학습 페이지로 이동합니다...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LevelTest;