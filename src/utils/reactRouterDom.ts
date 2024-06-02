import {
  Await as RrdAwait,
  defer,
  LoaderFunctionArgs,
  useLoaderData as useRrdLoaderData,
} from "react-router-dom";

/**
 * Helper functions as a workaround for the lack of type safety when using react-router-dom v6.
 * Code ref:
 * https://stackoverflow.com/questions/74877170/react-router-v6-5-how-to-strongly-type-data-loaders
 */

export type AwaitResolveRenderFunction<T> = {
  (data: Awaited<T>): React.ReactElement;
};

export type AwaitProps<T> = {
  children: React.ReactNode | AwaitResolveRenderFunction<T>;
  errorElement?: React.ReactNode;
  resolve: Promise<T>;
};

export type DeferredData<TData> = Omit<ReturnType<typeof defer>, "data"> & {
  data: TData;
};

export type LoaderFunction<T> = (args: LoaderFunctionArgs) => DeferredData<T>;

export function useLoaderData<
  TLoader extends ReturnType<typeof deferredLoader>
>() {
  return useRrdLoaderData() as ReturnType<TLoader>["data"];
}

export function deferredLoader<TData extends Record<string, unknown>>(
  dataFunc: (args: LoaderFunctionArgs) => TData
): LoaderFunction<TData> {
  return (args: LoaderFunctionArgs) =>
    defer(dataFunc(args)) as DeferredData<TData>;
}

export function Await<T>(props: AwaitProps<T>): JSX.Element {
  return RrdAwait(props);
}
