// ref: https://www.joshwcomeau.com/react/prefers-reduced-motion/

import React from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";

const getInitialState = () => !window.matchMedia(QUERY).matches;

export default function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    React.useState(getInitialState);

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);

    const handleMediaQueryListChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };

    mediaQueryList.addEventListener("change", handleMediaQueryListChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleMediaQueryListChange);
    };
  }, []);

  return prefersReducedMotion;
}
