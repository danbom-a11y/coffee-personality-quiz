"use client";

import { useState, useEffect } from "react";
import { PersonalityType, personalities } from "../quizData";

interface ResultsProps {
  scores: Record<PersonalityType, number>;
  totalQuestions: number;
  onRetake: () => void;
}

export default function Results({ scores, totalQuestions, onRetake }: ResultsProps) {
  const [barsAnimated, setBarsAnimated] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBarsAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Sort personalities by score descending, ties resolved by order: bold, zen, artisan, sweet
  const order: PersonalityType[] = ["bold", "zen", "artisan", "sweet"];
  const sorted = order
    .map((id) => ({
      ...personalities[id],
      score: scores[id],
      percentage: Math.round((scores[id] / totalQuestions) * 100),
    }))
    .sort((a, b) => b.score - a.score);

  const primary = sorted[0];

  const shareText = `I'm a ${primary.name}! ☕ My coffee: ${primary.coffee}. Take the quiz:`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Primary result card */}
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center mb-6 animate-fade-in">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Your Coffee Personality
        </p>
        <h2
          className="text-4xl font-extrabold mb-2"
          style={{ color: primary.color }}
        >
          {primary.name}
        </h2>
        <p className="text-lg text-gray-500 italic mb-4">
          &ldquo;{primary.tagline}&rdquo;
        </p>
        <div
          className="inline-block rounded-full px-6 py-2 text-white font-semibold text-sm"
          style={{ backgroundColor: primary.color }}
        >
          {primary.coffee}
        </div>
      </div>

      {/* Breakdown card */}
      <div className="bg-white rounded-2xl p-8 shadow-lg mb-6 animate-fade-in delay-100">
        <h3 className="text-lg font-bold text-gray-900 mb-5 text-center">
          Your Full Breakdown
        </h3>
        <div className="flex flex-col gap-4">
          {sorted.map((p) => (
            <div key={p.id}>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-gray-700">{p.name}</span>
                <span style={{ color: p.color }}>{p.percentage}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: barsAnimated ? `${p.percentage}%` : "0%",
                    backgroundColor: p.color,
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">{p.coffee}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="text-center animate-fade-in delay-200">
        <button
          onClick={onRetake}
          className="px-8 py-3 bg-white text-purple-600 font-bold rounded-full
            shadow-lg hover:shadow-xl transition-all duration-200
            hover:scale-105 active:scale-95 cursor-pointer"
        >
          Retake Quiz
        </button>
      </div>

      {/* Share section */}
      <div className="mt-6 text-center animate-fade-in delay-300">
        <p className="text-white/70 text-sm mb-3">Share your result</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 bg-white/20 backdrop-blur text-white font-semibold rounded-full
              text-sm hover:bg-white/30 transition-all duration-200
              active:scale-95 cursor-pointer"
          >
            {copied ? "Copied!" : "Copy Results"}
          </button>
          <button
            onClick={handleShareX}
            className="px-5 py-2.5 bg-white/20 backdrop-blur text-white font-semibold rounded-full
              text-sm hover:bg-white/30 transition-all duration-200
              active:scale-95 cursor-pointer"
          >
            Share on X
          </button>
          <button
            onClick={handleShareFacebook}
            className="px-5 py-2.5 bg-white/20 backdrop-blur text-white font-semibold rounded-full
              text-sm hover:bg-white/30 transition-all duration-200
              active:scale-95 cursor-pointer"
          >
            Share on Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
