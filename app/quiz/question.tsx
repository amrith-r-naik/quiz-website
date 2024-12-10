import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Question } from "../lib/types";
import { Button } from "@/components/ui/button";

const QuestionComponent = ({
  question,
  questionNumber,
}: {
  question: Question;
  questionNumber: number;
}) => {
  return (
    <div key={question.id} className="w-full flex flex-col gap-2">
      <h3 className="text-left text-lg font-semibold">
        {questionNumber + ". " + question.text}
      </h3>
      <RadioGroup className="w-full flex flex-col items-start gap-2 pl-4">
        {question.options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.text} id={option.id.toString()} />
            <label htmlFor={option.id.toString()}>{option.text}</label>
          </div>
        ))}
      </RadioGroup>
      <Button>Check</Button>
    </div>
  );
};

export default QuestionComponent;
