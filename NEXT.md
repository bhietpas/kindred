# NEXT.md — Kindred

The single source of truth for what to work on. Always read `CLAUDE.md` first.

**Rule:** do ONE item from "In Progress" at a time. Finish it (test-first, green,
refactored), update this file, then STOP and wait. Do not pull the next item yourself.

---

## In Progress

_(none — pull the next item)_

---

## Up Next (do not start until pulled into In Progress)

- [ ] **T3 — Database migrations**
  Flyway in `kindred-app`. `V1` users, `V2` profiles (interest tags as text[]),
  `V3` enable PostGIS + add location point column to profiles, `V4` connections.
  A local seed migration (dev profile only) with ~20 realistic profiles spread
  around one test city.

- [ ] **T4 — Profile CRUD**
  Domain port `ProfileRepository` + JPA adapter. Use case: create / fetch profile.
  REST: `POST /api/v1/profiles`, `GET /api/v1/profiles/{id}`,
  `PUT /api/v1/profiles/{id}`. Request/response as records. 404 returns a
  structured error body. Unit tests for the use case; Testcontainers integration
  test for the endpoints.

- [ ] **T5 — Matching engine (the core IP)**
  Domain port `MatchCandidateFinder.findWithinRadius(origin, miles)`. Use case
  `FindMatches`: (1) geo-filter via the port, (2) Jaccard similarity on interest
  tags, (3) recency boost for profiles active in last 7 days, (4) exclude already-
  connected and previously-declined users, (5) sort by score desc. The scoring +
  exclusion logic is pure and unit-tested with hand-built candidates — no DB.
  PostGIS adapter implements the port. `GET /api/v1/matches?radius=…`.

- [ ] **T6 — Connection flow**
  Accept / decline a candidate. `POST /api/v1/connections` (request),
  state transitions pending → accepted / declined. Declined pairs never resurface
  in matching (ties back to T5 exclusion). Use-case unit tests + integration test.

- [ ] **T7 — Auth at the edge**
  Introduce a `CurrentUser` abstraction in `kindred-app`. Wire Clerk JWT
  verification as a filter that populates it. Endpoints read identity from
  `CurrentUser`, never from the request body. Domain stays unaware of Clerk.
  *(Propose the verification approach before adding any Clerk dependency.)*

---

## Parking Lot (not scheduled — ideas only, do not build)

- Interest embeddings / pgvector ML matching (needs real usage data first)
- In-app messaging (transport decision deferred)
- Push notifications (Expo + APNs/FCM)
- Photo upload + moderation
- Web and mobile clients

---

## Done

- [x] **T3 — Database migrations** — V1 users, V2 profiles (interests as text[], age check), V3 PostGIS extension + geography(point) column + GIST index, V4 connections (no-self-connect + unique-pair constraints). Dev seed in `db/seed/V5` (20 Brooklyn profiles, active in dev profile only). 5 SchemaIT tests verify inserts, PostGIS point, and self-connect rejection.
- [x] **T2 — Domain model (pure)** — 7 types, all records/sealed interfaces, zero framework imports. 16 unit tests green (GeoLocation bounds, InterestTag blank/null, MatchScore range). `MatchCandidate` implements `Comparable` for score-desc sort.
- [x] **T1 — Monorepo scaffold** — `./gradlew build` green; Spring Boot 3.5.0 (3.3.x EOL'd on Initializr), Gradle 8.14.5 via wrapper + Foojay toolchain resolver (auto-downloads JDK 21). `HealthCheckIT` spins up real PostGIS 16 via Testcontainers, hits `/actuator/health`, passes.