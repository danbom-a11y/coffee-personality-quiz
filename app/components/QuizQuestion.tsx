"use client";

import { Question } from "../quizData";

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (personalityType: string) => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuizQuestionProps) {
  const progress = ((questionNumber - 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-xl mx-auto animate-slide-up">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-white/80 mb-2">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
        <h2 className="text-2xl sm:text-[1.65rem] font-bold text-gray-900 mb-6 text-center">
          {question.question}
        </h2>

        <div className="flex flex-col gap-3">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => onAnswer(answer.personality)}
              className="w-full text-left px-6 py-4 rounded-xl border-2 border-gray-100
                text-gray-700 font-medium transition-all duration-200
                hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700
                active:scale-[0.98] cursor-pointer"
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
