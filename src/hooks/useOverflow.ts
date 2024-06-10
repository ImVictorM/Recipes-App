import React from "react";

export default function useOverflow(
  ref: React.RefObject<HTMLElement>,
  callback?: (hasOverflow: boolean) => void
) {
  const [isOverflow, setIsOverflow] = React.useState(false);

  React.useLayoutEffect(() => {
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
