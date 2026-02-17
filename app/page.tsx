"use client";

import { useState } from "react";
import { PersonalityType, questions } from "./quizData";
import QuizQuestion from "./components/QuizQuestion";
import Results from "./components/Results";

type Screen = "welcome" | "quiz" | "results";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<PersonalityType, number>>({
    bold: 0,
    zen: 0,
    artisan: 0,
    sweet: 0,
  });

  const handleStart = () => {
    setScreen("quiz");
    setCurrentQuestion(0);
    setScores({ bold: 0, zen: 0, artisan: 0, sweet: 0 });
  };

  const handleAnswer = (personality: string) => {
    const newScores = { ...scores };
    newScores[personality as PersonalityType]++;
    setScores(newScores);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const order: PersonalityType[] = ["bold", "zen", "artisan", "sweet"];
      const winner = order.reduce((a, b) => newScores[a] >= newScores[b] ? a : b);
      fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores: newScores, primaryPersonality: winner }),
      });
      setScreen("results");
    }
  };

  const handleRetake = () => {
    handleStart();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {screen === "welcome" && (
        <div className="text-center max-w-lg animate-fade-in">
          <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">
            What&apos;s Your Coffee Personality?
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Answer 6 quick questions and discover the coffee drink
            that matches who you really are.
          </p>
          <button
            onClick={handleStart}
            className="px-10 py-4 bg-white text-purple-600 font-bold text-lg rounded-full
              shadow-lg hover:shadow-xl transition-all duration-200
              hover:scale-105 active:scale-95 cursor-pointer"
          >
            Start Quiz
          </button>
        </div>
      )}

      {screen === "quiz" && (
        <div key={currentQuestion} className="w-full flex justify-center">
          <QuizQuestion
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        </div>
      )}

      {screen === "results" && (
        <div className="animate-fade-in w-full flex justify-center">
          <Results
            scores={scores}
            totalQuestions={questions.length}
            onRetake={handleRetake}
          />
        </div>
      )}
    </div>
  );
}
