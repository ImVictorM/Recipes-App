import { useState } from "react";
import { copyToClipboard } from "@/utils/clipboard";

export default function useCopyToClipboardWithTooltip(
  initialMessage: string,
  onCopyMessage: string
) {
  const [tooltipMessage, setTooltipMessage] = useState(initialMessage);

  const copyAndSetTooltipMessage = (link: string) => {
    copyToClipboard(link);
    setTooltipMessage(onCopyMessage);

    setTimeout(() => {
      setTooltipMessage(initialMessage);
    }, 3000);
  };

  return { tooltipMessage, copyAndSetTooltipMessage };
}
