/** Makes jest-dom matchers global */
import "@testing-library/jest-dom/vitest";
import { createMatchMedia } from "./utils/matchMedia";

/** Mocks modules from __mocks__ folder */
vi.mock("axios");

/** Defines window properties */
vi.stubGlobal;
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: createMatchMedia(true),
});
