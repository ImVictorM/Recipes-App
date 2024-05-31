import { RefObject, useEffect, useRef, useState } from "react";

export type LinearScrollOptions = {
  scrollAmount?: number;
  isOverflow?: boolean;
};

export default function useLinearScroll(
  ref: RefObject<HTMLElement>,
  { isOverflow = true, scrollAmount = 200 }: LinearScrollOptions = {
    scrollAmount: 200,
    isOverflow: true,
  }
) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  /* Additional state to prevent re-renders inside useEffect **/
  const [isDragging, setIsDragging] = useState(false);

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    if (!ref.current || !isOverflow) return;
    const element = ref.current;

    const onScroll = () => {
      const threshold = 10;

      setIsAtStart(element.scrollLeft <= threshold);
      setIsAtEnd(
        element.scrollWidth <=
          element.scrollLeft + element.clientWidth + threshold
      );
    };

    const onWheel = (e: WheelEvent) => {
      /* If not scrolling vertically **/
      if (e.deltaY !== 0) {
        e.preventDefault();

        element.scrollTo({
          left: element.scrollLeft + e.deltaY,
        });
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      isDownRef.current = true;
      startXRef.current = e.pageX - element.offsetLeft;
      scrollLeftRef.current = element.scrollLeft;
    };

    const onMouseLeave = () => {
      setIsDragging(false);
      isDownRef.current = false;
    };

    const onMouseUp = () => {
      setIsDragging(false);
      isDownRef.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDownRef.current) return;

      e.preventDefault();

      requestAnimationFrame(() => {
        const x = e.pageX - element.offsetLeft;
        const walk = (x - startXRef.current) * 2;
        element.scrollLeft = scrollLeftRef.current - walk;
      });
    };

    element.addEventListener("scroll", onScroll);
    element.addEventListener("wheel", onWheel);
    element.addEventListener("mousedown", onMouseDown);
    element.addEventListener("mouseleave", onMouseLeave);
    element.addEventListener("mouseup", onMouseUp);
    element.addEventListener("mousemove", onMouseMove);

    return () => {
      element.removeEventListener("scroll", onScroll);
      element.removeEventListener("wheel", onWheel);
      element.removeEventListener("mousedown", onMouseDown);
      element.removeEventListener("mouseleave", onMouseLeave);
      element.removeEventListener("mouseup", onMouseUp);
      element.removeEventListener("mousemove", onMouseMove);
    };
  }, [isOverflow, ref]);

  /* Use this to manually scroll **/
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

  return { isAtEnd, isAtStart, isDragging, scrollTo };
}
