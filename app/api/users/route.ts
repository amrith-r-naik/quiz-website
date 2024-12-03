import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json(
        { error: "Missing name field" },
        { status: 400 },
      );
    }

    const user = await prisma.user.create({
      data: { name },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user", details: (error as Error).message },
      { status: 500 },
    );
  }
};
