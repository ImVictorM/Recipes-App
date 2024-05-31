import { RefObject, useLayoutEffect, useState } from "react";

export default function useOverflow(
  ref: RefObject<HTMLElement>,
  callback?: (hasOverflow: boolean) => void
) {
  const [isOverflow, setIsOverflow] = useState(false);

  useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      if (current) {
        const hasOverflow = current.scrollWidth > current.clientWidth;

        setIsOverflow(hasOverflow);

        if (callback) {
          callback(hasOverflow);
        }
      }
    };

    if ("ResizeObserver" in window && current) {
      const resizeObserver = new ResizeObserver(trigger);
      resizeObserver.observe(current);

      return () => resizeObserver.unobserve(current);
    }
  }, [callback, ref, ref.current?.textContent]);

  return { isOverflow };
}
