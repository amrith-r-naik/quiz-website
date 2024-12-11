import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";

// Utility function for error responses
const createErrorResponse = (message: string, status: number) => {
  console.log("Error : ", message);
  return NextResponse.json({ error: message }, { status });
};

export const GET = async (req: NextRequest) => {
  try {
    // Parse the URL and retrieve the query parameter
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    // Validate the input
    if (!id) {
      return createErrorResponse("Missing 'id' query parameter", 400);
    }

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return createErrorResponse("Invalid 'id' format; must be a number", 400);
    }

    // Query the database
    const quiz = await prisma.quiz.findUnique({
      where: { id: parsedId },
      include: { questions: { include: { options: true } }, subject: true },
    });

    // Check if the quiz exists
    if (!quiz) {
      return createErrorResponse("Quiz not found", 404);
    }

    // Return the quiz data
    return NextResponse.json(quiz);
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching quiz:", (error as Error).message);

    // Return a generic error response to the client
    return createErrorResponse(
      "Failed to fetch quiz. Please try again later.",
      500,
    );
  }
};
