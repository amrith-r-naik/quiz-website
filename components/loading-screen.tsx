import React from "react";
import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin" />
        <p>Loading quiz...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
