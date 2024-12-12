import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

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
  const handleSaveAttempt = async () => {
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
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        <Button className="w-full" onClick={handleSaveAttempt}>
          Finish Attempt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] md:max-w-[20%] rounded-md">
        <DialogHeader className="flex gap-2">
          <DialogTitle className="text-center">
            Your score is {score} out of {totalQuestions}
          </DialogTitle>
          <DialogDescription className="w-full flex gap-4 items-center justify-center">
            <DialogClose asChild onClick={onReset}>
              <Button>Attempt again</Button>
            </DialogClose>
            <Button variant="outline" onClick={onHome}>
              <Home />
              Home
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FinishAttemptDialog;
