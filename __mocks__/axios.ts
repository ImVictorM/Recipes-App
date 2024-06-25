import { isAxiosError as originalIsAxiosError } from "axios";
import { vi } from "vitest";

export const isAxiosError = vi.fn(originalIsAxiosError);

export const mockAxios = {
  post: vi.fn(),
  get: vi.fn(),
  delete: vi.fn(),
  put: vi.fn(),
  interceptors: {
    request: {
      use: vi.fn(),
      eject: vi.fn(),
    },
    response: {
      use: vi.fn(),
      eject: vi.fn(),
    },
  },
  create: function () {
    return this;
  },
  isAxiosError,
};

export default mockAxios;
