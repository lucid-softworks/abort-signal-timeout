# @lucid-softworks/abort-signal-timeout

Create a signal that aborts asynchronously after a non-negative deadline with a
`TimeoutAbortError` carrying the configured milliseconds.

```ts
import { timeoutSignal } from "@lucid-softworks/abort-signal-timeout";

await fetch(url, { signal: timeoutSignal(2_000) });
```
