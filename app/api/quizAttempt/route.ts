import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { quizId, score } = body;
    if (!quizId || score === undefined) {
      return NextResponse.json(
        {
          error: "Invalid input: 'quizId' and 'score' are required",
        },
        { status: 400 },
      );
    }

    const quizAttempt = await prisma.quizAttempt.create({
      data: {
        userId: 1, // TODO Hardcoded user ID for now
        quizId,
        score,
      },
    });

    return NextResponse.json(quizAttempt, { status: 201 });
  } catch (error) {
    console.error("Error creating quiz attempt:", (error as Error).message);
    return NextResponse.json(
      {
        error: "Failed to create quiz attempt",
        details: (error as Error).message,
      },
      { status: 500 },
    );
  }
};
