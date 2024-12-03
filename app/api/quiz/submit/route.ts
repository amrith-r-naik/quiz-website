import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { quizId, correctAnswersCount, totalQuestionsCount, userId } =
      await req.json();
    if (!quizId || !correctAnswersCount || !totalQuestionsCount || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (
      !Number.isInteger(correctAnswersCount) ||
      !Number.isInteger(totalQuestionsCount)
    ) {
      return NextResponse.json(
        {
          error: "correctAnswersCount and totalQuestionsCount must be integers",
        },
        { status: 400 },
      );
    }

    const score = (correctAnswersCount / totalQuestionsCount) * 100;
    const attempt = await prisma.quizAttempt.create({
      data: {
        score,
        quizId,
        userId,
      },
    });

    return NextResponse.json(attempt);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit quiz", details: (error as Error).message },
      { status: 500 },
    );
  }
};
