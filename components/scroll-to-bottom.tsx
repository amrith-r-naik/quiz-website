import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToButton = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const checkScrollPosition = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    setIsAtBottom(scrollTop + windowHeight >= documentHeight - 10);
  };

  const handleScroll = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScrollEvent = () => checkScrollPosition();
    window.addEventListener("scroll", handleScrollEvent);

    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        variant="outline"
        onClick={handleScroll}
        className="rounded-full p-[11px] shadow-lg"
      >
        {isAtBottom ? <ArrowUp /> : <ArrowDown />}
      </Button>
    </div>
  );
};

export default ScrollToButton;
