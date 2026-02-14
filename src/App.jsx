import { useState } from "react";
import { jsPDF } from "jspdf";

const questions = [
  {
    question: "रक्त समूह कितने प्रकार के होते हैं?",
    options: ["1", "2", "3", "4"],
    correct: "4",
  },
  {
    question: "निम्नलिखित में से किस रक्त समूह को सार्वभौमिक दाता माना जाता है?",
    options: ["A", "AB", "B", "O"],
    correct: "O",
  },
  {
    question: "मानव रक्त के स्थानांतरण की प्रक्रिया को क्या कहा जाता है?",
    options: ["Transfusion", "Processing", "Transporting", "Transferring"],
    correct: "Transfusion",
  },
  {
    question: "सबसे दुर्लभ रक्त समूह कौन सा है?",
    options: ["AB negative", "AB positive", "O negative", "O positive"],
    correct: "AB negative",
  },
  {
    question: "रक्त समूह की खोज किसने की?",
    options: ["Thomas Cooley", "Karl Landsteiner", "Camillo Golgi", "Ernst Haecker"],
    correct: "Karl Landsteiner",
  },
  {
    question: "मानव रक्त का pH मान है",
    options: ["6.2", "6.9", "7.4", "8.2"],
  },
  {
    question: "निम्नलिखित में से किस ब्लड ग्रुप को 'बॉम्बे ब्लड ग्रुप' के नाम से जाना जाता है?",
    options: ["AB negative", "HH Group", "A Group", "AB Group"],
    correct: "HH Group",
  },
  {
    question: "एक वयस्क के लिए औसत रक्त की मात्रा लगभग होती है",
    options: ["25 ltr", "2 ltr", "15 ltr", "5 ltr"],
    correct: "15 ltr",
  },
  {
    question: "निम्नलिखित में से किसे एरिथ्रोसाइट्स भी कहा जाता है?",
    options: ["Red Blood cells", "White Blood Cells", "Platelets", "All of above"],
    correct: "Red Blood cells",
  },
  {
    question: "निम्नलिखित में से कौन संक्रमण से लड़ता है और हमें बीमारियों से बचाता है?",
    options: ["Red Blood cells", "White Blood Cells", "Platelets", "Plasma"],
    correct: "white Blood Cells",
  },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);

  function handleAnswer(option) {
    const updated = [...answers];
    updated[current] = option;
    setAnswers(updated);

    nextQuestion();
  }

  function handleSkip() {
    const updated = [...answers];
    updated[current] = "Not Answered";
    setAnswers(updated);

    nextQuestion();
  }

  function nextQuestion() {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setCompleted(true);
    }
  }

  const score = answers.filter(
    (answer, index) => answer === questions[index].correct
  ).length;

  return (
    <div className="app-container">
      <main className="main">
        <div className="hero">
          <h1>Blood Group Objective Test</h1>
        </div>

        <div className="card">
          {!completed ? (
            <div className="card-body">
              <div className="question-count">
                Question {current + 1} of {questions.length}
              </div>

              <h2 className="question">
                {questions[current].question}
              </h2>

              <div className="options">
                {questions[current].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="option-btn"
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button onClick={handleSkip} className="skip-btn">
                Skip Question
              </button>
            </div>
          ) : (
            <div className="completed">
              <h2>Test Completed 🎉</h2>

              <h3>
                Your Score: {score} / {questions.length}
              </h3>

              <hr />

              {questions.map((q, index) => (
                <div key={index} style={{ marginBottom: "15px" }}>
                  <p><strong>Q{index + 1}:</strong> {q.question}</p>
                  <p>
                    <strong>Your Answer:</strong>{" "}
                    {answers[index] || "Not Answered"}
                  </p>
                  <p>
                    <strong>Correct Answer:</strong> {q.correct}
                  </p>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}