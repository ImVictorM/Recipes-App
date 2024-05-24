import copy from "clipboard-copy";

export function copyToClipboard(toCopy: string) {
  copy(toCopy);
}
