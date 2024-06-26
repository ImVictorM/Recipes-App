/** Makes jest-dom matchers global */
import "@testing-library/jest-dom/vitest";
import { createMatchMedia } from "./helpers/matchMedia";

/** Mocks modules from __mocks__ folder */
vi.mock("axios");

/** Defines window properties */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: createMatchMedia(true),
});
