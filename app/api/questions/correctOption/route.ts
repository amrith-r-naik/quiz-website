import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const questionId = url.searchParams.get("questionId");

    if (!questionId) {
      return new Response("questionId is required", { status: 400 });
    }

    const question = await prisma.question.findUnique({
      where: {
        id: parseInt(questionId),
      },
      include: {
        options: true,
      },
    });

    if (!question) {
      return new Response("Question not found", { status: 404 });
    }

    const correctOption = question.options.find((option) => option.isCorrect);
    if (!correctOption) {
      return new Response("Correct option not found", { status: 404 });
    }
    return NextResponse.json({ correctOptionId: correctOption.id });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch option", details: (error as Error).message },
      { status: 500 },
    );
  }
};
