import React from "react";

import useOverflow from "@/hooks/useOverflow";
import useFallbackRef from "@/hooks/useFallbackRef";

import { PolymorphicRef } from "@/types/polymorphicTypes";
import { ScrollLinearContainerProps } from "./ScrollLinearContainer.types";

const DEFAULT_COMPONENT = "div";

function ScrollLinearContainerComponent<
  T extends React.ElementType = typeof DEFAULT_COMPONENT
>(
  {
    scrollWithMouseWheel = true,
    scrollDragging = true,
    as,
    children,
    className,
    prefixDataTestId = "ScrollLinearContainer",
    ...restProps
  }: ScrollLinearContainerProps<T>,
  ref?: PolymorphicRef<T>
): React.ReactElement | null {
  const Component = as || DEFAULT_COMPONENT;
  const componentRef = useFallbackRef(ref);
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const startXRef = React.useRef<number>(0);
  const scrollLeftRef = React.useRef<number>(0);
  const { isOverflow } = useOverflow(componentRef);

  const handleOnMouseDown = (e: React.MouseEvent) => {
    if (!componentRef.current || !isOverflow) return;

    setIsMouseDown(true);
    startXRef.current = e.pageX - componentRef.current.offsetLeft;
    scrollLeftRef.current = componentRef.current.scrollLeft;
  };

  const handleOnMouseLeave = () => {
    if (!componentRef.current || !isOverflow) return;

    setIsMouseDown(false);
  };

  const handleOnMouseUp = () => {
    if (!componentRef.current || !isOverflow) return;

    setIsMouseDown(false);
  };

  const handleOnMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !componentRef.current || !isOverflow || !scrollDragging)
      return;

    e.preventDefault();

    const x = e.pageX - componentRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    componentRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  /*
    Workaround for preventing default
    wheel behavior.
   
    In React v18.3.1, calling e.preventDefault() inside
    an onWheel event handler can be blocked by some browsers, such as Chrome v123.0.6312.86.

    To resolve this issue, it is necessary to set the passive option
    of the event listener to false, although this may decrease scrolling
    responsiveness.
  **/
  React.useEffect(() => {
    if (!componentRef.current || !isOverflow || !scrollWithMouseWheel) return;

    const element = componentRef.current;

    const handleOnWheel = (e: React.WheelEvent) => {
      if (e.deltaY === 0) return;

      e.preventDefault();

      element.scrollTo({
        left: element.scrollLeft + e.deltaY,
      });
    };

    element.addEventListener("wheel", handleOnWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleOnWheel);
    };
  }, [componentRef, isOverflow, scrollWithMouseWheel]);

  return (
    <Component
      ref={componentRef}
      onMouseDown={handleOnMouseDown}
      onMouseLeave={handleOnMouseLeave}
      onMouseUp={handleOnMouseUp}
      onMouseMove={handleOnMouseMove}
      className={`${className ? className : ""} ${
        isMouseDown ? "active-dragging" : "snaps-inline"
      }`}
      {...restProps}
      data-testid={prefixDataTestId}
    >
      {children}
    </Component>
  );
}

export const ScrollLinearContainer = React.forwardRef(
  ScrollLinearContainerComponent
) as <T extends React.ElementType = typeof DEFAULT_COMPONENT>(
  props: ScrollLinearContainerProps<T>
) => React.ReactElement | null;

export default ScrollLinearContainer;
