import { invariant } from "@lucid-softworks/invariant";

export class TimeoutAbortError extends Error {
  public override readonly name = "TimeoutAbortError";

  public constructor(readonly milliseconds: number) {
    super(`Signal timed out after ${milliseconds}ms`);
  }
}

/** Creates a signal that aborts asynchronously after `milliseconds`. */
export function timeoutSignal(milliseconds: number): AbortSignal {
  invariant(
    Number.isFinite(milliseconds) && milliseconds >= 0,
    "milliseconds must be a finite, non-negative number",
  );
  const controller = new AbortController();
  setTimeout(
    () => controller.abort(new TimeoutAbortError(milliseconds)),
    milliseconds,
  );
  return controller.signal;
}
