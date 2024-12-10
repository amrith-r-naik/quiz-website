"use client";
import { useEffect, useState } from "react";

type Option = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type Question = {
  id: string;
  text: string;
  quizId: string;
  options: Option[];
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [quizId, setQuizId] = useState("");
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function fetchQuestions() {
      const id = (await params).id;
      setQuizId(id);
      const response = await fetch("/api/questions?quizId=" + id);
      const data = await response.json();
      setQuestions(data);
    }
    fetchQuestions();
  }, [params]);
  return (
    // Dummy implementation
    <div>
      Quiz {quizId}
      <ul>
        {questions.map((q: Question) => (
          <li key={q.id}>{q.text}</li>
        ))}
      </ul>
    </div>
  );
}
