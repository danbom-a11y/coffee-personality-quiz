export type PersonalityType = "bold" | "zen" | "artisan" | "sweet";

export interface Personality {
  id: PersonalityType;
  name: string;
  coffee: string;
  tagline: string;
  color: string;
}

export interface Answer {
  text: string;
  personality: PersonalityType;
}

export interface Question {
  question: string;
  answers: Answer[];
}

export const personalities: Record<PersonalityType, Personality> = {
  bold: {
    id: "bold",
    name: "Bold Adventurer",
    coffee: "Double Espresso",
    tagline: "You live for intensity",
    color: "#ef4444",
  },
  zen: {
    id: "zen",
    name: "Zen Minimalist",
    coffee: "Black Coffee, Single Origin",
    tagline: "Simple. Clean. Perfect.",
    color: "#3b82f6",
  },
  artisan: {
    id: "artisan",
    name: "Artisan Snob",
    coffee: "Pour-Over, Single Origin",
    tagline: "You know what you like",
    color: "#a855f7",
  },
  sweet: {
    id: "sweet",
    name: "Sweet Enthusiast",
    coffee: "Caramel Latte",
    tagline: "Life's too short for bitter",
    color: "#f59e0b",
  },
};

export const questions: Question[] = [
  {
    question: "Pick a movie genre for a Friday night.",
    answers: [
      { text: "Action / thriller", personality: "bold" },
      { text: "Documentary", personality: "zen" },
      { text: "Indie film festival pick", personality: "artisan" },
      { text: "Romantic comedy", personality: "sweet" },
    ],
  },
  {
    question: "Pick your dream vacation.",
    answers: [
      { text: "Solo backpacking through mountains", personality: "bold" },
      { text: "Silent meditation retreat", personality: "zen" },
      { text: "A curated wine & culture tour", personality: "artisan" },
      { text: "Beach resort with unlimited desserts", personality: "sweet" },
    ],
  },
  {
    question: "Pick a superpower.",
    answers: [
      { text: "Time travel", personality: "bold" },
      { text: "Telekinesis", personality: "zen" },
      { text: "Read minds", personality: "artisan" },
      { text: "Fly", personality: "sweet" },
    ],
  },
  {
    question: "It's Saturday morning. What are you doing?",
    answers: [
      { text: "Already out the door on an adventure", personality: "bold" },
      { text: "Quiet morning, no phone, just stillness", personality: "zen" },
      { text: "Browsing a farmers market for the perfect ingredient", personality: "artisan" },
      { text: "Making pancakes and watching cartoons", personality: "sweet" },
    ],
  },
  {
    question: "Pick a fictional character to grab coffee with.",
    answers: [
      { text: "Indiana Jones", personality: "bold" },
      { text: "Yoda", personality: "zen" },
      { text: "Sherlock Holmes", personality: "artisan" },
      { text: "Ted Lasso", personality: "sweet" },
    ],
  },
  {
    question: "You're a candle. What do you smell like?",
    answers: [
      { text: "Campfire smoke", personality: "bold" },
      { text: "Fresh rain", personality: "zen" },
      { text: "Aged leather and old books", personality: "artisan" },
      { text: "Vanilla birthday cake", personality: "sweet" },
    ],
  },
];
