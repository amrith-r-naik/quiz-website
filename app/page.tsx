"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Github, Loader2, Palette } from "lucide-react";
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setSubjectsLoading(true);
        setError(null); // Reset error state
        const response = await fetch(`/api/subjects`);

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || "Failed to fetch subjects");
        }

        const data = await response.json();
        setSubjects(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setSubjectsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <main className="h-full w-full flex flex-col px-4 py-2 md: ">
      {/* Hero Section */}
      <div className="h-full flex flex-col justify-center gap-8 md:flex-row md:items-center md:w-[99%]">
        <div className="md:max-w-[30%] flex flex-col justify-start text-center w-full md:text-left md:gap-2 -translate-y-4">
          <h1 className="text-5xl font-black">Practice those MCQ subjects</h1>
          <p className="hidden md:block text-xl text-muted-foreground">
            Click on a subject to view available quizes.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="md:border md:rounded-md md:h-[80%] px-2 py-4 md:overflow-y-auto md:min-w-[30%]"
        >
          <div className="hidden md:flex justify-center border-b pb-4">
            <p className="text-center w-fit rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              Available Subjects
            </p>
          </div>
          {subjectsLoading && (
            <div className="flex gap-2 opacity-30 justify-center items-center md:min-h-[88%]">
              <Loader2 className="animate-spin" />
              <span className="">Loading subjects...</span>
            </div>
          )}
          {error && (
            <div className="flex gap-2 justify-center items-center md:min-h-[88%]">
              <p className="text-destructive">Error : {error}</p>
            </div>
          )}
          {subjects.length === 0 && !subjectsLoading && !error && (
            <div className="flex gap-2 justify-center items-center md:min-h-[88%]">
              <p className="text-muted-foreground">No subjects available</p>
            </div>
          )}
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
                    {subject.quizzes
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((quiz) => (
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
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/theme')}
          className="mr-2"
          title="Customize Theme"
        >
          <Palette className="h-5 w-5" />
        </Button>
        <Link
          href="https://github.com/amrith-r-naik/quiz-website"
          className="text-sm hover:underline underline md:no-underline flex items-center justify-center gap-1"
        >
          <Github
            size={28}
            className="border p-[5px] hover:bg-secondary rounded-full"
          />
          Github
        </Link>
      </div>
    </main>
  );
}     