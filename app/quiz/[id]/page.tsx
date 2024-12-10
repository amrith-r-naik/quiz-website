"use client";
import { useEffect, useState } from "react";
import QuestionComponent from "../question";
import type { Quiz, Question } from "@/app/lib/types";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
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

  // TODO: Implement a loading state
  if (!quiz) return <div>Unable to load quiz</div>;
  return (
    // Dummy implementation
    <div className="w-full h-full flex flex-col items-center">
      {/* Heading */}
      <div className="w-full flex flex-col items-center gap-2 border-b pb-4">
        <h2 className="text-center scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Elements of Cloud Computing
        </h2>
        <h2 className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {quiz.name}
        </h2>
      </div>
      {/* Quiz Questions */}
      <div className="w-full flex flex-col items-center gap-4 mt-4">
        {questions.map((question, index) => (
          <QuestionComponent
            key={question.id}
            question={question}
            questionNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
}