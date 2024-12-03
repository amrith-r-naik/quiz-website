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

// Create a new quiz for a subject
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { name, subjectId } = body;

  if (!name || !subjectId) {
    return NextResponse.json(
      { error: "Name and Subject ID are required" },
      { status: 400 },
    );
  }

  const subject = await prisma.subject.findUnique({
    where: {
      id: parseInt(subjectId),
    },
  });

  if (!subject) {
    return NextResponse.json({ error: "Subject not found" }, { status: 404 });
  }

  try {
    const quiz = await prisma.quiz.create({
      data: {
        name,
        subjectId: parseInt(subjectId),
      },
    });
    return NextResponse.json(quiz);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create quiz" },
      { status: 500 },
    );
  }
};
