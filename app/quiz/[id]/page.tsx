"use client";
import { useEffect, useState } from "react";
import QuestionComponent from "../question";
import type { Quiz, Question } from "@/app/lib/types";
import RefreshWarning from "@/components/refresh-warning";
import { Loader2 } from "lucide-react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const id = (await params).id;

        const response = await fetch(`/api/quiz?id=${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch quiz: ${response.statusText}`);
        }

        const data: Quiz = await response.json();
        setQuiz(data);
        setQuestions(data.questions);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [params]);

  const updateScoreOnCorrect = () => {
    setScore((prevScore) => prevScore + 1);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="animate-spin" />
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center w-full h-full flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-destructive">Error</h2>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold">Quiz Not Found</h2>
        <p className="text-muted-foreground">
          The requested quiz does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center md:px-[25%]">
      <RefreshWarning />
      {/* Heading */}
      <div className="w-full flex flex-col items-center gap-2 border-b pb-4 md:py-8">
        <h2 className="text-center scroll-m-20 text-2xl font-bold tracking-tight first:mt-0">
          {quiz.subject.name}
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
