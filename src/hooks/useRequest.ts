import React from "react";
import { isAxiosError } from "axios";

export default function useRequest() {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const abortControllerRef = React.useRef(new AbortController());

  const resetAbortController = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
  };

  const request = React.useCallback(
    async (
      fetch: (abortController: AbortController) => Promise<void>,
      onCatch?: (error: unknown) => Promise<void> | void
    ) => {
      setIsLoading(true);
      resetAbortController();

      try {
        await fetch(abortControllerRef.current);

        setErrorMessage(null);
      } catch (error) {
        if (abortControllerRef.current.signal.aborted) {
          return;
        } else if (isAxiosError(error) && error.config?.signal?.aborted) {
          return;
        }

        if (onCatch) {
          await onCatch(error);
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleSetErrorMessage = React.useCallback((message: string) => {
    setErrorMessage(message);
  }, []);

  React.useEffect(() => {
    return () => {
      abortControllerRef.current.abort();
    };
  }, []);

  return {
    errorMessage,
    setErrorMessage: handleSetErrorMessage,
    isLoading,
    request,
  };
}
