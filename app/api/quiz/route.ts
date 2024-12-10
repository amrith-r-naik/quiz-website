import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Missing quizId field" },
        { status: 400 },
      );
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(id) },
      include: { questions: { include: { options: true } }, subject: true },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Quiz", details: (error as Error).message },
      { status: 500 },
    );
  }
};
