import { RefObject, useEffect, useState } from "react";

export default function useLinearScroll(
  ref: RefObject<HTMLElement>,
  scrollAmount: number = 200
) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;

    const handleScroll = () => {
      const threshold = 10;

      setIsAtStart(element.scrollLeft <= threshold);
      setIsAtEnd(
        element.scrollWidth <=
          element.scrollLeft + element.clientWidth + threshold
      );
    };

    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  const scrollTo = (direction: "left" | "right") => {
    if (!ref.current) return;

    const currentScrollLeft = ref.current.scrollLeft;
    const maxScrollLeft = ref.current.scrollWidth - ref.current.clientWidth;

    switch (direction) {
      case "left": {
        const targetScrollLeftLeft = Math.max(
          0,
          currentScrollLeft - scrollAmount
        );
        ref.current.scrollTo({
          behavior: "smooth",
          left: targetScrollLeftLeft,
        });
        break;
      }
      case "right": {
        const targetScrollLeftRight = Math.min(
          maxScrollLeft,
          currentScrollLeft + scrollAmount
        );
        ref.current.scrollTo({
          behavior: "smooth",
          left: targetScrollLeftRight,
        });
        break;
      }
    }
  };

  return { isAtEnd, isAtStart, scrollTo };
}
