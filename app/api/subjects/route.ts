import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";

// Get all subjects
export const GET = async () => {
  try {
    const subjects = await prisma.subject.findMany({
      include: { quizzes: true },
    });
    return NextResponse.json(subjects);
  } catch (error) {
    console.error("Failed to fetch subjects:", (error as Error).message);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to fetch subjects",
        details: (error as Error).message,
      }),
      { status: 500 },
    );
  }
};

// Create a new subject
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return new NextResponse(
        JSON.stringify({
          error: "Invalid input: 'name' is required and must be a string",
        }),
        { status: 400 },
      );
    }

    const subject = await prisma.subject.create({
      data: { name },
    });
    return NextResponse.json(subject, { status: 201 });
  } catch (error) {
    console.error("Failed to create subject:", (error as Error).message);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to create subject",
        details: (error as Error).message,
      }),
      { status: 500 },
    );
  }
};
