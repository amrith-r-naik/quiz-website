import { Prisma } from "@prisma/client";

export type Subject = Prisma.SubjectGetPayload<{
  include: {
    quizzes: true;
  };
}>;

export type Quiz = Prisma.QuizGetPayload<{
  include: {
    subject: true;
    questions: {
      include: {
        options: true;
      };
    };
  };
}>;

export type Question = Prisma.QuestionGetPayload<{
  include: {
    options: true;
  };
}>;
