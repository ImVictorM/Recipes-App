import copy from "clipboard-copy";

export default function copyToClipboard(toCopy: string) {
  copy(toCopy);
}
