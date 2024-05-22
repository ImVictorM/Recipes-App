import { useState } from "react";
import copy from "clipboard-copy";

type UseClipboardCopyArgs = {
  successCopyMessage?: string;
  successMessageTimeout?: number;
};

const defaultArgs = {
  successCopyMessage: "Link copied!",
  successMessageTimeout: 3000,
};

export default function useClipboardCopy(
  {
    successCopyMessage = defaultArgs.successCopyMessage,
    successMessageTimeout = defaultArgs.successMessageTimeout,
  }: UseClipboardCopyArgs = {
    successCopyMessage: defaultArgs.successCopyMessage,
    successMessageTimeout: defaultArgs.successMessageTimeout,
  }
) {
  const [successfullyCopiedMessage, setSuccessfullyCopiedMessage] = useState<
    string | null
  >(null);

  const copyToClipboard = (toCopy: string) => {
    copy(toCopy);
    setSuccessfullyCopiedMessage(successCopyMessage);

    setTimeout(() => {
      setSuccessfullyCopiedMessage(null);
    }, successMessageTimeout);
  };

  return { copyToClipboard, successfullyCopiedMessage };
}
