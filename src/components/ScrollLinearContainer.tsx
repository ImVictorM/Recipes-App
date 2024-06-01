import { useFallbackRef, useOverflow } from "@/hooks";
import {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from "@/types/polymorphicTypes";
import React, { useEffect, useRef, useState } from "react";

/* 
  If necessary, pass additional props as second argument
  of "PolymorphicComponentPropWithRef".
 **/
export type ScrollLinearContainerProps<T extends React.ElementType> =
  PolymorphicComponentPropWithRef<
    T,
    {
      scrollWithMouseWheel?: boolean;
    }
  >;

function ScrollLinearContainerComponent<T extends React.ElementType = "div">(
  {
    scrollWithMouseWheel = true,
    as,
    children,
    className,
    ...restProps
  }: ScrollLinearContainerProps<T>,
  ref?: PolymorphicRef<T>
): React.ReactElement | null {
  const Component = as || "div";
  const componentRef = useFallbackRef(ref);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
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
    if (!isMouseDown || !componentRef.current || !isOverflow) return;

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
  useEffect(() => {
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
      className={`${className} ${
        isMouseDown ? "active-dragging" : "snaps-inline"
      }`}
      {...restProps}
    >
      {children}
    </Component>
  );
}

const ScrollLinearContainer = React.forwardRef(
  ScrollLinearContainerComponent
) as <T extends React.ElementType = "div">(
  props: ScrollLinearContainerProps<T>
) => React.ReactElement | null;

export default ScrollLinearContainer;
