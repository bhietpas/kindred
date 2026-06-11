# /slice — Implement one task slice end-to-end, then stop

Delivers one atomic unit of work from `NEXT.md`: context map → failing tests → implementation → green → reviewer approval → commit. Exactly one slice per invocation, then summarize and stop.

---

## Step 1 — Gather context with the `explorer` agent

Spawn the `explorer` sub-agent to map the files relevant to this slice:
- Existing domain types, use cases, ports, and value objects the slice touches
- Adjacent tests that show the current testing patterns for this area
- Controller / adapter entry points that will need wiring

Use explorer's path-and-summary output to decide what to read in full. Do **not** read entire files yourself before knowing which ones matter.

---

## Step 2 — Write failing tests (Red)

From the slice's acceptance criteria in `NEXT.md`:

1. **Domain unit tests** (`kindred-domain/src/test/…`) for any new use-case logic.
2. **Integration tests** (`kindred-app/src/test/…`) for any new endpoint or persistence change, using Testcontainers against real PostGIS.
3. Run the tests. Confirm they **fail for the right reason** — a missing class or method, not a compile error (unless the task requires adding a new type).

Do **not** write production code yet.

---

## Step 3 — Implement to green (Green)

Write the minimum production code required to make the failing tests pass.

- **Domain layer first** (`kindred-domain`) — pure Java, zero framework imports.
- **App layer second** (`kindred-app`) — Spring wiring, JPA adapters, controller changes.
- Follow all `CLAUDE.md` conventions:
  - Java records for DTOs; sealed interfaces for domain errors
  - Constructor injection; inject `Clock`, never call `Instant.now()` inline
  - No Lombok; no speculative abstractions
- Run the affected test suite and confirm all targeted tests are green.

---

## Step 4 — Run full affected test suite

```bash
./gradlew :kindred-domain:test :kindred-app:test
```

All tests must be green — no regressions.

---

## Step 5 — Reviewer pass

Spawn the `reviewer` sub-agent on the current diff.

- **`APPROVE`** → proceed to Step 6.
- **`CHANGES`** → fix every listed finding, re-run tests (Step 4), then spawn reviewer again. Repeat until `APPROVE`.

> Note: the `verify` hook runs automatically on every Edit/Write and catches compile errors early. A `CHANGES` verdict from the reviewer catches convention violations that compile cleanly.

---

## Step 6 — Update `NEXT.md`

- Move the completed item from "In Progress" (or "Up Next") to the **Done** section.
- One-line summary: what was built and the final test count (`X domain + Y app`).
- If a new concern surfaced (follow-up task, deferred decision, discovered debt), add it to **Parking Lot**.

---

## Step 7 — Commit

Stage all changed files **except** `.class` files and anything under `bin/` or `build/` directories.

Commit message format:
```
T<N> — <Slice title>: <one-line summary>

Tests: <X domain + Y app>, all green.
```

---

## Stop

Output a 3–5 line summary: what was built, final test counts, any notable decisions. Then **stop**. Do not pull the next item from `NEXT.md`.

---

### Notes on future surfaces

When the React Native (`kindred-mobile`) or Next.js (`kindred-web`) modules are scaffolded, extend the `verify` hook (`.claude/hooks/verify.sh`) with:
```bash
# TS equivalent — add once RN/Next is scaffolded
if echo "$INPUT" | grep -qi "kindred-mobile\|kindred-web"; then
  npx prettier --write "$FILE_PATH" -q
  npx tsc --noEmit -p "$TS_PROJECT_ROOT/tsconfig.json"
fi
```
