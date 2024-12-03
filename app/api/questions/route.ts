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
    });

    // Return the fetched quiz and questions as a JSON response with status 200
    return NextResponse.json({ quiz, questions }, { status: 200 });
  } catch (error) {
    // Log the error to the console
    console.error("Error fetching questions:", error);

    // Return a 500 response with an error message
    return NextResponse.json(
      { error: "Failed to fetch questions", details: (error as Error).message },
      { status: 500 },
    );
  }
};
