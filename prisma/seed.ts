import prisma from "@/app/lib/prisma";
import fs from "fs";

async function main() {
  // await prisma.quizAttempt.deleteMany();
  // await prisma.option.deleteMany();
  // await prisma.question.deleteMany();
  // await prisma.quiz.deleteMany();
  // await prisma.subject.deleteMany();
  // await prisma.user.deleteMany();

  // Create Subject
  const subject = await prisma.subject.create({
    data: {
      name: "Operating System - AD1101-1",
    },
  });

  // Create Quiz
  const quiz = await prisma.quiz.create({
    data: {
      name: "Unit 1",
      subjectId: subject.id,
    },
  });

  const questionsData = JSON.parse(
    fs.readFileSync("./prisma/questions.json", "utf8"),
  );

  // Create Questions
  for (const question of questionsData) {
    await prisma.question.create({
      data: {
        text: question.text,
        quizId: quiz.id,
        options: {
          create: question.options,
        },
      },
    });
  }

  console.log(
    "Database seeded successfully with multiple subjects and quizzes!",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
