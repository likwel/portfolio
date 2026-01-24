import { useEffect, useState } from "react";
import { faArrowUp, faMessage } from "@fortawesome/free-solid-svg-icons";
import DuotoneIcon from "./DuotoneIcon";

export default function FloatingActions({ onMessageClick }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      {showTop && (
        <div
          onClick={scrollToTop}
          className="cursor-pointer w-12 h-12 rounded-full bg-white border text-white flex items-center justify-center shadow-lg hover:bg-blue-200 transition-all hover:-translate-y-1"
        >
          <DuotoneIcon icon={faArrowUp} size={'text-sm'}/>
        </div>
      )}

      <div
        onClick={onMessageClick}
        className="cursor-pointer w-12 h-12 rounded-full bg-green-200 text-white flex items-center justify-center shadow-lg hover:bg-green-300 transition-all hover:-translate-y-1 animate-pulse"
      >
        <DuotoneIcon icon={faMessage} size={'text-xl'} />
      </div>
    </div>
  );
}