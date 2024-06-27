/**
 * Helper functions as a workaround for the lack of type safety when using react-router-dom v6.
 * Code ref:
 * https://stackoverflow.com/questions/74877170/react-router-v6-5-how-to-strongly-type-data-loaders
 */

import {
  Await as RrdAwait,
  defer as rrdDefer,
  useLoaderData as useRrdLoaderData,
} from "react-router-dom";

import {
  DeferredData,
  LoaderCallback,
  UseLoaderDataReturn,
  AwaitProps,
} from "./reactRouterDom.types";

export function useLoaderData<TLoader extends LoaderCallback<unknown>>() {
  return useRrdLoaderData() as UseLoaderDataReturn<ReturnType<TLoader>>;
}

export function defer<T extends Record<string, unknown>>(
  data: T
): DeferredData<T> {
  return rrdDefer(data) as DeferredData<T>;
}

export function Await<T>(props: AwaitProps<T>): JSX.Element {
  return RrdAwait(props);
}
