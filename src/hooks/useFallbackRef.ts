import { PolymorphicRef } from "@/types/polymorphicTypes";
import React from "react";

export default function useFallbackRef<T extends React.ElementType>(
  forwardedRef: PolymorphicRef<T>
): PolymorphicRef<T> {
  const fallbackRef = React.useRef<T>(null);
  return forwardedRef || fallbackRef;
}
