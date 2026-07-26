import { afterEach, describe, expect, it, vi } from "vitest";

import { timeoutSignal, TimeoutAbortError } from "../src/index.js";

describe("timeoutSignal", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("aborts asynchronously after the deadline with details", async () => {
    vi.useFakeTimers();
    const signal = timeoutSignal(25);
    expect(signal.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(24);
    expect(signal.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect(signal.aborted).toBe(true);
    expect(signal.reason).toBeInstanceOf(TimeoutAbortError);
    expect(signal.reason).toMatchObject({
      milliseconds: 25,
      message: "Signal timed out after 25ms",
    });
  });

  it("uses a timer even for zero", async () => {
    vi.useFakeTimers();
    const signal = timeoutSignal(0);
    expect(signal.aborted).toBe(false);
    await vi.runAllTimersAsync();
    expect(signal.aborted).toBe(true);
  });

  it.each([-1, Number.NaN, Number.POSITIVE_INFINITY])(
    "rejects the invalid deadline %s",
    (milliseconds) => {
      expect(() => timeoutSignal(milliseconds)).toThrow(
        "milliseconds must be a finite, non-negative number",
      );
    },
  );
});
