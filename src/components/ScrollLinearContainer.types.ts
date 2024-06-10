import { PolymorphicComponentPropWithRef } from "@/types/polymorphicTypes";

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
