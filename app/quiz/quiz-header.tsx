type QuizHeaderProps = {
  subject: string;
  quizName: string;
};

const QuizHeader = ({ subject, quizName }: QuizHeaderProps) => (
  <div className="w-full flex flex-col items-center gap-2 border-b pb-4 md:py-8">
    <h2 className="text-center scroll-m-20 text-3xl font-bold tracking-tight first:mt-0">
      {subject}
    </h2>
    <h2 className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {quizName}
    </h2>
  </div>
);

export default QuizHeader;
