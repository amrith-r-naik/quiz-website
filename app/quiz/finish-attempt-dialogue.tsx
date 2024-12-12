import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Home, Loader2 } from "lucide-react";
import { useState } from "react";

type FinishAttemptDialogProps = {
  score: number;
  totalQuestions: number;
  quizId: number;
  onReset: () => void;
  onHome: () => void;
};

const FinishAttemptDialog = ({
  score,
  totalQuestions,
  quizId,
  onReset,
  onHome,
}: FinishAttemptDialogProps) => {
  const [confirmSave, setConfirmSave] = useState(false);
  const [attemptSaving, setAttemptSaving] = useState(false);

  const handleSaveAttempt = async () => {
    setAttemptSaving(true);
    try {
      const response = await fetch("/api/quizAttempt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizId: quizId,
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
    setConfirmSave(true); // Reset confirmation state
    setAttemptSaving(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full" asChild>
        <Button className="w-full">Finish Attempt</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[90%] md:max-w-[20%] rounded-md justify-center">
        <AlertDialogHeader className="flex gap-2">
          <AlertDialogTitle className="text-center">
            {!confirmSave
              ? "Are you sure you want to save your attempt?"
              : `Your score is ${score} out of ${totalQuestions}`}
          </AlertDialogTitle>
          <AlertDialogDescription className="w-full flex gap-4 items-center justify-center">
            {!confirmSave ? (
              <>
                <Button onClick={handleSaveAttempt}>
                  {attemptSaving ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Yes, Save"
                  )}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setConfirmSave(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onReset}>Attempt Again</Button>
                <Button variant="outline" onClick={onHome}>
                  <Home />
                  Home
                </Button>
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FinishAttemptDialog;
