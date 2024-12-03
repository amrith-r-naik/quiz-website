// NOTE : Before seeding, do the following:
// 1. Make the correctOptionId and correctOption fields in the Question table not required as below
//      model Question {
//        id              Int      @id @default(autoincrement())
//        text            String
//        options         Option[] @relation("QuestionOptions")
//        correctOptionId Int?     @unique
//        correctOption   Option?  @relation("CorrectOption", fields: [correctOptionId], references: [id])
//        quizId          Int
//        quiz            Quiz     @relation(fields: [quizId], references: [id])
//      }
// 2. Then do bunx prisma db push
// 3. Next you can do the seeding with bunx prisma/seed.ts
// 4. Once seeded reverse the changes made to the Question model in the schema
// 5. Finally run bunx prisma db push to reverse the changes in the database as well.

import prisma from "@/app/lib/prisma";

async function main() {
  await prisma.quizAttempt.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.user.deleteMany();

  // Create Subjects
  const math = await prisma.subject.create({
    data: { name: "Mathematics" },
  });

  const science = await prisma.subject.create({
    data: { name: "Science" },
  });

  // Create Quizzes for Mathematics
  const algebraQuiz = await prisma.quiz.create({
    data: { name: "Unit 1", subjectId: math.id },
  });

  const geometryQuiz = await prisma.quiz.create({
    data: { name: "Unit 2", subjectId: math.id },
  });

  // Create Quizzes for Science
  const physicsQuiz = await prisma.quiz.create({
    data: { name: "Unit 1", subjectId: science.id },
  });

  const chemistryQuiz = await prisma.quiz.create({
    data: { name: "Unit 2", subjectId: science.id },
  });

  // Function to Create Questions and Options
  async function createQuestionWithOptions(
    text: string,
    quizId: number,
    options: { text: string; isCorrect: boolean }[],
  ) {
    const question = await prisma.question.create({
      data: { text, quizId },
    });

    await prisma.option.createMany({
      data: options.map((option) => ({
        text: option.text,
        questionId: question.id,
      })),
    });

    const correctOption = await prisma.option.findFirst({
      where: {
        questionId: question.id,
        text: options.find((opt) => opt.isCorrect)?.text,
      },
    });

    await prisma.question.update({
      where: { id: question.id },
      data: { correctOptionId: correctOption!.id },
    });
  }

  // Create Questions and Options for Algebra Quiz
  await createQuestionWithOptions("What is 2 + 2?", algebraQuiz.id, [
    { text: "3", isCorrect: false },
    { text: "4", isCorrect: true },
    { text: "5", isCorrect: false },
  ]);

  await createQuestionWithOptions("Solve for x: 2x = 10.", algebraQuiz.id, [
    { text: "4", isCorrect: false },
    { text: "5", isCorrect: true },
    { text: "6", isCorrect: false },
  ]);

  // Create Questions and Options for Geometry Quiz
  await createQuestionWithOptions(
    "What is the sum of angles in a triangle?",
    geometryQuiz.id,
    [
      { text: "180 degrees", isCorrect: true },
      { text: "360 degrees", isCorrect: false },
      { text: "90 degrees", isCorrect: false },
    ],
  );

  await createQuestionWithOptions(
    "What is the shape of a square?",
    geometryQuiz.id,
    [
      { text: "Four equal sides", isCorrect: true },
      { text: "Three equal sides", isCorrect: false },
      { text: "No equal sides", isCorrect: false },
    ],
  );

  // Create Questions and Options for Physics Quiz
  await createQuestionWithOptions(
    "What is the unit of force?",
    physicsQuiz.id,
    [
      { text: "Newton", isCorrect: true },
      { text: "Joule", isCorrect: false },
      { text: "Watt", isCorrect: false },
    ],
  );

  await createQuestionWithOptions(
    "What is the speed of light?",
    physicsQuiz.id,
    [
      { text: "300,000 km/s", isCorrect: true },
      { text: "150,000 km/s", isCorrect: false },
      { text: "1,000 km/s", isCorrect: false },
    ],
  );

  // Create Questions and Options for Chemistry Quiz
  await createQuestionWithOptions(
    "What is the symbol for water?",
    chemistryQuiz.id,
    [
      { text: "H2O", isCorrect: true },
      { text: "O2", isCorrect: false },
      { text: "CO2", isCorrect: false },
    ],
  );

  await createQuestionWithOptions(
    "What is the pH of a neutral substance?",
    chemistryQuiz.id,
    [
      { text: "7", isCorrect: true },
      { text: "0", isCorrect: false },
      { text: "14", isCorrect: false },
    ],
  );

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
