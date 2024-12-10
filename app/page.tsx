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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/subjects`);
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };

    fetchSubjects();
  }, [baseUrl]);
  return (
    <main className="h-full w-full flex flex-col">
      {/* Hero Section */}
      <div className="h-full flex flex-col justify-center gap-8">
        <h1 className="text-5xl font-black">Practice those MCQ subjects</h1>
        <Accordion type="single" collapsible>
          {subjects.map((subject: Subject) => (
            <AccordionItem key={subject.id} value={subject.id}>
              <AccordionTrigger className="hover:no-underline font-bold py-2">
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
