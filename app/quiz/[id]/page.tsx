"use client";
import { useEffect, useState } from "react";
import QuestionComponent from "../question";
import type { Quiz, Question } from "@/app/lib/types";
import RefreshWarning from "@/components/refresh-warning";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchQuiz() {
      const id = (await params).id;
      const response = await fetch("/api/quiz?id=" + id);
      const data = await response.json();
      setQuiz(data);
      setQuestions(data.questions);
    }
    fetchQuiz();
  }, [params]);

  const updateScoreOnCorrect = () => {
    setScore((prevScore) => prevScore + 1);
  };

  // TODO: Implement a loading state
  if (!quiz) return <div>Unable to load quiz</div>;
  return (
    // Dummy implementation
    <div className="w-full h-full flex flex-col items-center md:px-[25%]">
      <RefreshWarning />
      {/* Heading */}
      <div className="w-full flex flex-col items-center gap-2 border-b pb-4 md:py-8">
        <h2 className="text-center scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Elements of Cloud Computing
        </h2>
        <h2 className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {quiz.name}
        </h2>
      </div>
      {/* Quiz Questions */}
      <div className="w-full flex flex-col items-center gap-4 mt-4 md:gap-8 md:mt-8">
        {questions.map((question, index) => (
          <QuestionComponent
            key={question.id}
            question={question}
            questionNumber={index + 1}
            updateScoreOnCorrect={updateScoreOnCorrect}
          />
        ))}
      </div>
      {/* Score */}
      <div className="w-full flex flex-col items-center gap-2 mt-4">
        <h2 className="text-center text-xl font-semibold">
          Score: {score} / {questions.length}
        </h2>
      </div>
    </div>
  );
}
