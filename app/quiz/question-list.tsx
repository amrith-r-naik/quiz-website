import QuestionComponent from "./question";
import type { Question } from "@/app/lib/types";

type QuestionsListProps = {
  questions: Question[];
  onCorrect: () => void;
};

const QuestionsList = ({ questions, onCorrect }: QuestionsListProps) => (
  <div className="w-full flex flex-col items-center gap-4 mt-4 md:gap-8 md:mt-8">
    {questions.map((question, index) => (
      <QuestionComponent
        key={question.id}
        question={question}
        questionNumber={index + 1}
        updateScoreOnCorrect={onCorrect}
      />
    ))}
  </div>
);

export default QuestionsList;
