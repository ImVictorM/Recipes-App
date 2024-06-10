export default function waitForMs(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
