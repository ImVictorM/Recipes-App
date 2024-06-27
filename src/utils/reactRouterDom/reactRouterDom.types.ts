import { defer, LoaderFunctionArgs } from "react-router-dom";

export type AwaitResolveRenderFunction<T> = {
  (data: Awaited<T>): React.ReactElement;
};

export type AwaitProps<T> = {
  children: React.ReactNode | AwaitResolveRenderFunction<T>;
  errorElement?: React.ReactNode;
  resolve: Promise<T>;
};

export type DeferredData<T> = Omit<ReturnType<typeof defer>, "data"> & {
  data: T;
};

export type LoaderCallbackReturn<T> =
  | Promise<DeferredData<T>>
  | DeferredData<T>
  | Promise<T>;

export type LoaderCallback<T> = (
  args: LoaderFunctionArgs
) => LoaderCallbackReturn<T>;

export type UseLoaderDataReturn<T extends LoaderCallbackReturn<unknown>> =
  T extends DeferredData<infer U>
    ? U
    : T extends Promise<DeferredData<infer U>>
    ? U
    : T extends Promise<infer U>
    ? U
    : never;
