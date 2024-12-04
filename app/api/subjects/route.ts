/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Get all subjects
export const GET = async () => {
  try {
    const subjects = await prisma.subject.findMany();
    return NextResponse.json(subjects);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Failed to fetch subjects",
        details: (error as Error).message,
      }),
      {
        status: 500,
      },
    );
  }
};

// Create a new subject
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { name } = body;
  try {
    const subject = await prisma.subject.create({
      data: {
        name,
      },
    });
    return NextResponse.json(subject);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to create subject" }),
      {
        status: 500,
      },
    );
  }
};
