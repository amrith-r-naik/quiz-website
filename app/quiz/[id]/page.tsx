"use client";
import { useEffect, useState } from "react";
import QuestionComponent from "../question";
import type { Quiz, Question } from "@/app/lib/types";
import RefreshWarning from "@/components/refresh-warning";
import { ArrowDown, Home, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const router = useRouter();

  const handleFinishAttempt = async () => {
    try {
      const response = await fetch("/api/quizAttempt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizId: quiz?.id,
          score: score,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save quiz attempt: ${response.statusText}`);
      }
    } catch (err) {
      console.error(
        (err as Error).message ||
          "An unexpected error occurred while saving quiz attempt",
      );
    }
    setShowSavePrompt(true);
  };

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
    <div className="w-full h-fit flex flex-col items-center md:px-[25%] px-4 gap-4 py-8">
      <RefreshWarning />
      {/* Heading */}
      <div className="w-full flex flex-col items-center gap-2 border-b pb-4 md:py-8">
        <h2 className="text-center scroll-m-20 text-3xl  font-bold tracking-tight first:mt-0">
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

      {/* Finish Attempt */}
      <Separator />
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="w-full"> Finish Attempt</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90%] md:max-w-[20%] rounded-md">
          {!showSavePrompt ? (
            <DialogHeader className="flex gap-2">
              <DialogTitle className="text-center">
                Are you sure you want to finish your attempt?
              </DialogTitle>
              <DialogDescription className="w-full flex gap-4 items-center justify-center">
                <Button onClick={handleFinishAttempt}>Yes</Button>
                <DialogClose asChild>
                  <Button variant={"secondary"}>Cancel</Button>
                </DialogClose>
              </DialogDescription>
            </DialogHeader>
          ) : (
            <DialogHeader className="flex gap-2">
              <DialogTitle className="text-center">
                Your score is {score} out of {questions.length}
              </DialogTitle>
              <DialogDescription className="w-full flex gap-4 items-center justify-center">
                {/* <h2>Do you want to save your attempt for future review?</h2>
                <div className="w-full flex gap-4 justify-center">
                  <Button>Save</Button>
                  <DialogClose asChild>
                    <Button variant={"secondary"}>Don&apos;t Save</Button>
                  </DialogClose>
                </div> */}
                <DialogClose
                  asChild
                  onClick={() => {
                    setScore(0);
                    setShowSavePrompt(false);
                    router.refresh();
                  }}
                >
                  <Button>Attempt again</Button>
                </DialogClose>
                <Button variant={"outline"} onClick={() => router.push("/")}>
                  <Home />
                  Home
                </Button>
              </DialogDescription>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>

      {/* Floating Button to Scroll to Bottom */}
      <div className="fixed bottom-4 right-4">
        <Button
          variant={"outline"}
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
          className="rounded-full p-[11px] shadow-lg"
        >
          <ArrowDown />
        </Button>
      </div>
    </div>
  );
}
