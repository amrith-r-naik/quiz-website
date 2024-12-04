import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// Get all questions for a quiz. pass the quizId as a query parameter
export const GET = async (req: NextRequest) => {
  try {
    // Parse the URL to get the query parameters
    const url = new URL(req.url);
    const quizId = url.searchParams.get("quizId");

    // Check if quizId is provided
    if (!quizId) {
      return NextResponse.json(
        { error: "quizId is required" },
        { status: 400 },
      );
    }

    // Fetch the quiz from the database using the provided quizId
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(quizId) },
    });

    // If the quiz is not found, return a 404 response
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Fetch the questions associated with the quizId
    const questions = await prisma.question.findMany({
      where: { quizId: parseInt(quizId) },
      include: {
        options: {
          select: { id: true, text: true, isCorrect: true },
        },
      },
    });

    // Return the fetched quiz and questions as a JSON response with status 200
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    // Return a 500 response with an error message
    return NextResponse.json(
      { error: "Failed to fetch questions", details: (error as Error).message },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    // Parse the request body to get the quizId and question data
    const { quizId, question, options } = await req.json();

    // Check if quizId and question data are provided
    if (
      !quizId ||
      !question ||
      !options ||
      !Array.isArray(options) ||
      options.length !== 4
    ) {
      return NextResponse.json(
        {
          error: "quizId, question, and exactly 4 options are required",
        },
        { status: 400 },
      );
    }

    // Validate that each option has text and isCorrect fields
    for (const option of options) {
      if (!option.text || typeof option.isCorrect !== "boolean") {
        return NextResponse.json(
          {
            error: "Each option must have text and isCorrect fields",
          },
          { status: 400 },
        );
      }
    }

    const hasCorrectOption = options.some((option) => option.isCorrect);
    if (!hasCorrectOption) {
      return NextResponse.json(
        {
          error: "At least one option must be marked as correct",
        },
        { status: 400 },
      );
    }

    // Fetch the quiz from the database using the provided quizId
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(quizId) },
    });

    // If the quiz is not found, return a 404 response
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Create a new question in the database with the provided data
    const newQuestion = await prisma.question.create({
      data: {
        text: question,
        quizId: parseInt(quizId),
        options: {
          create: options,
        },
      },
      include: {
        options: {
          select: { id: true, text: true, isCorrect: true },
        },
      },
    });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    // Return a 500 response with an error message
    return NextResponse.json(
      { error: "Failed to create question", details: (error as Error).message },
      { status: 500 },
    );
  }
};
