type ErrorScreenProps = {
  message: string;
};

const ErrorScreen = ({ message }: ErrorScreenProps) => (
  <div className="text-center w-full h-full flex flex-col justify-center">
    <h2 className="text-xl font-semibold text-destructive">Error</h2>
    <p className="text-muted-foreground">{message}</p>
  </div>
);

export default ErrorScreen;
