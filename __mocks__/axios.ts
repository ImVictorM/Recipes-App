import { vi } from "vitest";

const mockAxios = {
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
};

export default mockAxios;
