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

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setCompleted(true);
    }
  }

  // ✅ Calculate Score
  const score = answers.filter(
    (answer, index) => answer === questions[index].correct
  ).length;

  function downloadPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Blood Group Test Report", 20, 20);

    doc.setFontSize(14);
    doc.text(`Your Score: ${score} / ${questions.length}`, 20, 30);

    doc.setFontSize(12);

    questions.forEach((q, i) => {
      doc.text(`${i + 1}. ${q.question}`, 20, 45 + i * 15);
      doc.text(`Your Answer: ${answers[i]}`, 25, 52 + i * 15);
      doc.text(`Correct Answer: ${q.correct}`, 25, 59 + i * 15);
    });

    doc.save("blood-test-result.pdf");
  }

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
            </div>
          ) : (
            <div className="completed">
              <h2>Test Completed 🎉</h2>

              <h3>
                Your Score: {score} / {questions.length}
              </h3>

              {score === questions.length && <p>Excellent Performance! 🔥</p>}
              {score >= 3 && score < questions.length && (
                <p>Good Job 👍</p>
              )}
              {score < 3 && <p>Need More Practice 📚</p>}

              <button onClick={downloadPDF} className="download-btn">
                Download Result PDF
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}