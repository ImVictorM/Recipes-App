import { PolymorphicComponentPropWithRef } from "@/types/polymorphicTypes";
import { TestableComponent } from "@/types/testableComponent";

/* 
  If necessary, pass additional props as second argument
  of "PolymorphicComponentPropWithRef".
 **/
export type ScrollLinearContainerProps<T extends React.ElementType> =
  TestableComponent &
    PolymorphicComponentPropWithRef<
      T,
      {
        scrollWithMouseWheel?: boolean;
        scrollDragging?: boolean;
      }
    >;
