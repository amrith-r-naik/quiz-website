import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Question } from "../lib/types";
import { Button } from "@/components/ui/button";

const QuestionComponent = ({
  question,
  questionNumber,
  updateScoreOnCorrect,
}: {
  question: Question;
  questionNumber: number;
  updateScoreOnCorrect: () => void;
}) => {
  const options = question.options;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const handleCheck = () => {
    if (options.find((option) => option.text === selectedOption)?.isCorrect) {
      setIsCorrect(true);
      updateScoreOnCorrect();
    } else {
      setIsCorrect(false);
    }
  };
  return (
    <div key={question.id} className="w-full flex flex-col gap-2">
      <h3 className="text-left text-lg font-semibold">
        {questionNumber + ". " + question.text}
      </h3>
      <RadioGroup
        onValueChange={(value) => setSelectedOption(value)}
        disabled={isCorrect !== null}
        className="w-full flex flex-col items-start pl-2"
      >
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`flex items-center space-x-2 w-full px-2 rounded-sm py-1 ${
              isCorrect !== null
                ? option.isCorrect
                  ? "bg-green-400/30"
                  : option.text === selectedOption
                    ? "bg-red-400/30"
                    : ""
                : ""
            }`}
          >
            <RadioGroupItem value={option.text} id={option.id.toString()} />
            <label htmlFor={option.id.toString()}>{option.text}</label>
          </div>
        ))}
      </RadioGroup>
      {isCorrect === null && (
        <Button
          onClick={() => {
            handleCheck();
          }}
          size={"sm"}
          disabled={selectedOption === null}
        >
          {selectedOption === null ? "Select an option" : "Check"}
        </Button>
      )}
    </div>
  );
};

export default QuestionComponent;
