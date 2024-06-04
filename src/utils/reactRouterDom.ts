/**
 * Helper functions as a workaround for the lack of type safety when using react-router-dom v6.
 * Code ref:
 * https://stackoverflow.com/questions/74877170/react-router-v6-5-how-to-strongly-type-data-loaders
 */

import {
  Await as RrdAwait,
  defer as rrdDefer,
  LoaderFunctionArgs as RrdLoaderFunctionArgs,
  useLoaderData as useRrdLoaderData,
} from "react-router-dom";

export type AwaitResolveRenderFunction<T> = {
  (data: Awaited<T>): React.ReactElement;
};

export type AwaitProps<T> = {
  children: React.ReactNode | AwaitResolveRenderFunction<T>;
  errorElement?: React.ReactNode;
  resolve: Promise<T>;
};

export type DeferredData<T> = Omit<ReturnType<typeof rrdDefer>, "data"> & {
  data: T;
};

type LoaderCallbackReturn<T> =
  | Promise<DeferredData<T>>
  | DeferredData<T>
  | Promise<T>;

export type LoaderCallback<T> = (
  args: RrdLoaderFunctionArgs
) => LoaderCallbackReturn<T>;

type ExtractData<T extends LoaderCallbackReturn<unknown>> =
  T extends DeferredData<infer U>
    ? U
    : T extends Promise<DeferredData<infer U>>
    ? U
    : T extends Promise<infer U>
    ? U
    : never;

export function useLoaderData<TLoader extends LoaderCallback<unknown>>() {
  return useRrdLoaderData() as ExtractData<ReturnType<TLoader>>;
}

export function defer<T extends Record<string, unknown>>(
  data: T
): DeferredData<T> {
  return rrdDefer(data) as DeferredData<T>;
}

export function Await<T>(props: AwaitProps<T>): JSX.Element {
  return RrdAwait(props);
}
