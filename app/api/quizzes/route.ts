/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Get all quizzes for a subject
export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const subjectId = url.searchParams.get("subjectId");
  if (!subjectId) {
    return new NextResponse(
      JSON.stringify({ error: "Subject ID is required" }),
      {
        status: 400,
      },
    );
  }

  try {
    const quizzes = await prisma.quiz.findMany({
      where: {
        subjectId: parseInt(subjectId),
      },
    });
    return NextResponse.json(quizzes);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch quizzes" }),
      {
        status: 500,
      },
    );
  }
};
