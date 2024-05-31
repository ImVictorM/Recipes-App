export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>["ref"];

export type AsProp<T extends React.ElementType> = {
  as?: T;
};

export type PropsToOmit<T extends React.ElementType, Props> = keyof (AsProp<T> &
  Props);

export type PolymorphicComponentProp<
  T extends React.ElementType,
  Props = object
> = React.PropsWithChildren<Props & AsProp<T>> &
  Omit<React.ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

export type PolymorphicComponentPropWithRef<
  T extends React.ElementType,
  Props = object
> = PolymorphicComponentProp<T, Props> & { ref?: PolymorphicRef<T> };
