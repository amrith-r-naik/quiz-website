"use client";
import ModeSwitcherButton from "@/components/mode-switcher";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Subject = {
  id: string;
  name: string;
  quizzes: {
    id: string;
    name: string;
  }[];
};

export default function Home() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState("");
  const [subjectsLoading, setSubjectsLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      setSubjectsLoading(true);
      const response = await fetch(`/api/subjects`);
      const data = await response.json();
      setSubjects(data);
      setSubjectsLoading(false);
    };

    fetchSubjects();
  }, []);
  return (
    <main className="h-full w-full flex flex-col px-4 py-2">
      {/* Hero Section */}
      <div className="h-full flex flex-col justify-center gap-8">
        <h1 className="text-5xl font-black text-center">
          Practice those MCQ subjects
        </h1>

        {subjectsLoading && (
          <div className="flex gap-2 opacity-30 justify-center items-center">
            <Loader2 className="animate-spin" />
            <span className="">Loading subjects...</span>
          </div>
        )}
        <Accordion type="single" collapsible>
          {subjects.map((subject: Subject) => (
            <AccordionItem key={subject.id} value={subject.id}>
              <AccordionTrigger className="hover:no-underline font-bold py-2 px-1 text-left">
                {subject.name}
              </AccordionTrigger>
              {subject.quizzes.length > 0 ? (
                <AccordionContent>
                  <ul
                    className="flex flex-col gap-2 px-4
                  "
                  >
                    {subject.quizzes.map((quiz) => (
                      <li
                        key={quiz.id}
                        className="flex w-full justify-between items-center"
                      >
                        <p className="text-md">{quiz.name}</p>
                        <Button
                          size={"sm"}
                          onClick={() => {
                            router.push(`/quiz/${quiz.id}`);
                            setLoading(quiz.id);
                          }}
                          className="w-20"
                        >
                          {loading === quiz.id ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Attempt"
                          )}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              ) : (
                <AccordionContent>No quizzes available</AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="text-lg flex gap-2 w-full justify-center items-center">
        <Link
          href="https://github.com/amrith-r-naik/quiz-website"
          className="text-sm hover:underline"
        >
          Github
        </Link>
        <ModeSwitcherButton />
      </div>
    </main>
  );
}
