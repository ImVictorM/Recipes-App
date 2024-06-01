import { PolymorphicRef } from "@/types/polymorphicTypes";
import { useRef } from "react";

export default function useFallbackRef<T extends React.ElementType>(
  forwardedRef: PolymorphicRef<T>
): PolymorphicRef<T> {
  const fallbackRef = useRef<T>(null);
  return forwardedRef || fallbackRef;
}
