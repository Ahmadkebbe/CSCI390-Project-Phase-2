import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizQuestions, getMatches, sportsData } from "../Pages/SportsData";

export default function QuizPage() {
  const navigate = useNavigate();

  const [quizStep,    setQuizStep]    = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizDone,    setQuizDone]    = useState(false);

  const handleAnswer = (qid, val) => {
    const updated = { ...quizAnswers, [qid]: val };
    setQuizAnswers(updated);

    if (quizStep < quizQuestions.length - 1) {
      setTimeout(() => setQuizStep((s) => s + 1), 250);
    } else {
      setTimeout(() => setQuizDone(true), 300);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizDone(false);
  };

  const matches = quizDone ? getMatches(quizAnswers) : [];
  const progress = ((quizStep + 1) / quizQuestions.length) * 100;

  if (quizDone) {
    return (
      <div className="page">
        <div className="quiz-container">
          <h2 className="quiz-results-title">Your matches</h2>
          <p className="quiz-results-sub">
            Based on your answers — click any sport to see venues.
          </p>

          <div className="results-list">
            {matches.map((name, i) => {
              const s = sportsData[name];
              return (
                <div
                  key={name}
                  className={`result-card${i === 0 ? " top" : ""}`}
                  style={{ "--sport-color": s.color }}
                  onClick={() => navigate(`/sports/${name.toLowerCase()}`)}
                >
                  <span className="result-emoji">{s.emoji}</span>
                  <div className="result-info">
                    <div className="result-name">{name}</div>
                    <div className="result-sub">{s.tagline}</div>
                  </div>
                  {i === 0 && <span className="result-badge">Best Match</span>}
                  <span className="result-arrow">→</span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <button className="quiz-restart" onClick={resetQuiz}>
              ↺ Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const current = quizQuestions[quizStep];
  return (
    <div className="page">
      <div className="quiz-container">
        {}
        <div className="quiz-progress-bar">
          <div
            className="quiz-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="quiz-q-num">
          Question {quizStep + 1} of {quizQuestions.length}
        </div>

        <div className="quiz-q-text">{current.text}</div>

        <div className="quiz-options">
          {current.options.map((opt) => (
            <button
              key={opt.value}
              className={`quiz-option${
                quizAnswers[current.id] === opt.value ? " selected" : ""
              }`}
              onClick={() => handleAnswer(current.id, opt.value)}
            >
              <span className="quiz-option-icon">{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}