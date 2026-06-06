# CLAUDE.md — Kindred

Read this file fully before doing anything. Then read `NEXT.md` for the current task.

---

## 1. What This Is

Kindred is a friend-finder app. People build a profile and get matched with nearby,
compatible people to become friends.

Surfaces (built in this order, not all at once):
1. `kindred-api` — Spring Boot backend (the focus right now)
2. `kindred-web` — Next.js web app (later)
3. `kindred-mobile` — React Native / Expo (later)

**Right now we are only building the backend.** Do not scaffold web or mobile yet.

---

## 2. Operating Principles (read these as hard rules)

You are a senior pair programmer. The human is the architect. Your job is to
implement small, well-tested increments — not to make product or architecture
decisions on your own.

1. **Test first, always.** No production code is written before a failing test
   that requires it. Follow Red → Green → Refactor. If asked to add behavior with
   no test, write the test first and confirm it fails for the right reason.
2. **One task at a time.** Do the single task named in `NEXT.md` or by the human.
   When it's done, STOP and report. Do not start the next item.
3. **No new dependencies without approval.** Default to the JDK and Spring Boot
   starters already present. If you believe a library is needed, stop and propose
   it: what it is, why, the lighter alternative, and the cost of not using it.
   Wait for a yes.
4. **No unrequested changes.** Touch only what the task needs. Do not "improve"
   unrelated files, rename things, reformat, or refactor outside the task scope.
5. **YAGNI.** Build exactly what the task requires. No speculative interfaces,
   config flags, abstraction layers, or "we might need this later" code.
6. **Keep the domain pure.** `kindred-domain` must have zero Spring, JPA, Jackson,
   or web imports. This is a hard line — never cross it.
7. **Don't spin.** If you're stuck after two genuine attempts, or the task is
   ambiguous, STOP and ask one focused question. Do not thrash, do not invent
   requirements, do not silently change the goal to something easier.
8. **Small and readable beats clever.** Short functions, intention-revealing names,
   no comments that restate the code. If a comment explains *what*, delete it and
   fix the name. Comments may explain *why*.

If a request conflicts with these principles, say so before proceeding.

---

## 3. Architecture — Clean Architecture, kept minimal

Dependencies point inward. The domain knows nothing about the outside world.

```
kindred-api/
  kindred-domain/        # pure Java. entities, value objects, use cases, ports.
                         # NO framework dependencies. The core.
  kindred-app/           # Spring Boot. adapters + composition root.
      web/               # REST controllers, request/response records, error mapping
      persistence/       # JPA entities + repository adapters (implement domain ports)
      config/            # Spring wiring, security
```

Rule: `kindred-app` depends on `kindred-domain`. `kindred-domain` depends on nothing.

**Why two modules, not three:** matching logic lives as a package inside
`kindred-domain`, not its own module, until there's a real reason to split it.
Fewer moving parts. We can extract later if it earns its own boundary.

### The ports pattern (important for matching)
The domain defines interfaces (ports) it needs; the app implements them (adapters).
Example: geo-filtering needs PostGIS, which is a database detail. So:
- `kindred-domain` defines `MatchCandidateFinder` (a port) and the `FindMatches`
  use case, which holds the *pure* scoring/exclusion logic.
- `kindred-app` provides the PostGIS-backed adapter that implements the port.

The scoring algorithm stays pure and unit-testable with no database.

---

## 4. Tech Decisions (locked — do not relitigate)

| Concern        | Choice                          | Notes |
|----------------|---------------------------------|-------|
| Language       | Java 21                         | records, sealed interfaces, pattern matching |
| Build          | Gradle (Kotlin DSL)             | version catalog in `libs.versions.toml` |
| Framework      | Spring Boot 3.3+                | only the starters we actually use |
| Database       | PostgreSQL + PostGIS            | geo is core; PostGIS from day one |
| Migrations     | Flyway                          | every schema change is a versioned migration |
| API style      | Plain REST, `/api/v1/...`       | versioned from the first endpoint |
| Tests          | JUnit 5, AssertJ, Testcontainers| Mockito only where a real object is impractical |
| Auth           | Clerk, kept at the edge         | a `CurrentUser` abstraction in the app layer; never leaks into domain |
| Local infra    | docker-compose (Postgres only)  | |

### Do NOT add these yet (deferred — wait for a real, proven need)
- GraphQL — plain REST until it hurts
- Redis — use Postgres / in-memory until proven necessary
- pgvector / ML matching — tag-based scoring first; revisit with real data
- Kafka / message queues
- Firebase / external messaging — chat is a later phase
- Lombok — use Java records and explicit code instead

If you think one of these is now needed, that's a STOP-and-propose moment (rule 3).

---

## 5. Code Conventions

- **DTOs / value objects:** Java `record`s. Immutable.
- **Domain errors:** `sealed interface` hierarchies, not exceptions for control flow.
  Map to HTTP status only at the web boundary.
- **No Lombok.** Records cover most of it; write the rest explicitly.
- **Dependency injection:** constructor injection only. No field injection.
- **Repositories/services:** program to interfaces defined in the domain.
- **Time:** never call `Instant.now()` inline. Inject a `Clock` so tests are
  deterministic.
- **Nulls:** prefer `Optional` at boundaries; avoid passing null. Validate inputs
  at the edge, trust them inward.
- **Location:** never store raw lat/lng as loose fields — use the PostGIS point
  type and a `GeoLocation` value object in the domain.

---

## 6. Testing Rules

- Domain logic (matching, scoring, validation) → fast **unit tests**, no Spring,
  no database.
- API endpoints and persistence adapters → **integration tests** with Testcontainers
  against real Postgres+PostGIS. No H2 substitute — test against the real engine.
- Each test asserts one behavior. Name tests for the behavior, not the method
  (`returnsEmptyWhenNoProfilesWithinRadius`, not `testFindMatches`).
- A bug fix starts with a failing test that reproduces the bug.

---

## 7. The Loop You Follow Every Task

1. Read the task in `NEXT.md`. Restate it in one sentence to confirm understanding.
2. Write the failing test(s). Run them. Confirm they fail for the right reason.
3. Write the minimum code to pass. Run tests. Green.
4. Refactor for clarity only — no new behavior. Tests stay green.
5. Update `NEXT.md`: move the item to done, note anything discovered.
6. Summarize what changed in 3–5 lines. STOP. Wait for the human.

Do not run ahead to step 1 of the next task.