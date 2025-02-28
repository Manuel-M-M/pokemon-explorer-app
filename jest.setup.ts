import "jest-styled-components";
import fetchMock from "jest-fetch-mock";
import { TextEncoder, TextDecoder } from "util";

fetchMock.enableMocks();

global.TextEncoder = TextEncoder;

if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder as never;
}

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as never;
