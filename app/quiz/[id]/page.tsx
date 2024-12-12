"use client";
import { useEffect, useState } from "react";
import type { Quiz, Question } from "@/app/lib/types";
import RefreshWarning from "@/components/refresh-warning";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import QuizHeader from "../quiz-header";
import QuestionsList from "../question-list";
import FinishAttemptDialog from "../finish-attempt-dialogue";
import ScrollToBottomButton from "@/components/scroll-to-bottom";
import LoadingScreen from "@/components/loading-screen";
import ErrorScreen from "@/components/error-screen";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
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
    <div className="w-full h-fit flex flex-col items-center md:px-[25%] px-4 gap-4 py-8">
      <RefreshWarning />
      <QuizHeader subject={quiz.subject.name} quizName={quiz.name} />
      {/* Quiz Questions */}
      <QuestionsList
        questions={questions}
        onCorrect={() => setScore(score + 1)}
      />

      {/* Finish Attempt */}
      <Separator />
      <FinishAttemptDialog
        score={score}
        totalQuestions={questions.length}
        quizId={quiz.id}
        onReset={() => {
          setScore(0);
          router.refresh();
        }}
        onHome={() => router.push("/")}
      />

      {/* Floating Button to Scroll to Bottom */}
      <ScrollToBottomButton />
    </div>
  );
}
