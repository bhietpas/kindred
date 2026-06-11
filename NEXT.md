# NEXT.md — Kindred

The single source of truth for what to work on. Always read `CLAUDE.md` first.

**Rule:** do ONE item from "In Progress" at a time. Finish it (test-first, green,
refactored), update this file, then STOP and wait. Do not pull the next item yourself.

---

## In Progress

*(nothing — waiting for next task)*

---

## Up Next (do not start until pulled into In Progress)

- [ ] **T9 — Input validation**
  Add `spring-boot-starter-validation` and annotate all request records with Bean
  Validation constraints (`@NotBlank`, `@Size`, `@Min`/`@Max`, `@DecimalMin` etc.).
  Validate in controllers with `@Valid`. Map `MethodArgumentNotValidException` to a
  structured 400 response (reuse the existing error-body format: `code` + `message` +
  optional `fields` list). Add unit/integration tests for at least one invalid-input
  case per endpoint. Domain use cases should still do their own guard checks — Bean
  Validation is an edge filter, not a substitute for domain rules.

- [ ] **T10 — Pagination on matches**
  Replace the unbounded list returned by `GET /api/v1/matches` with a page-based
  response. Use cursor-based pagination (a `nextCursor` token) rather than
  offset/page-number — safer for real-time data. The cursor encodes the last-seen
  score + profile ID so the next page can pick up cleanly. Return a wrapper:
  `{ "matches": [...], "nextCursor": "..." | null }`. Update `FindMatches` use case
  and the PostGIS adapter to accept a limit and cursor. Default page size: 20, max: 50.
  Update `MatchControllerIT` to assert the response shape and that `nextCursor` is
  present when results exist.

---

## Parking Lot (not scheduled — ideas only, do not build)

- Interest embeddings / pgvector ML matching (needs real usage data first)
- In-app messaging (transport decision deferred)
- Push notifications (Expo + APNs/FCM)
- Photo upload + moderation
- Web and mobile clients

---

## Done

- [x] **T8 — List connections** — `ListConnections` use case in `kindred-domain` (filters `findInvolvingUser` results in memory; `Optional<Connection.Status>` statusFilter). `GET /api/v1/connections` endpoint on `ConnectionController` with optional `?status=` query param (400 for unknown status; 200 empty list if no user record found). `ListConnections` bean wired in `AppConfig`. 4 new `ConnectionControllerIT` tests: all connections, status filter, empty list, invalid status → 400. 87 total tests (35 app + 52 domain), all green.
- [x] **T7 — Auth at the edge** — `spring-boot-starter-oauth2-resource-server` added. `SecurityConfig` wires JWT resource server with a `NimbusJwtDecoder` (JWKS URI from env) that is overridden in integration tests via nested `@TestConfiguration`. `JwtToCurrentUserConverter` extracts `sub` claim → `CurrentUser(clerkId)` principal. `UserLookup` service maps `clerkId → userId` (auto-creates users row on first profile creation). Endpoints updated: `POST /profiles` and `GET /matches` derive identity from `@AuthenticationPrincipal`; `userId` removed from request bodies. Connection endpoints likewise use `CurrentUser` for requester/responder lookup. All endpoints return 401 when unauthenticated. Integration test pattern: nested `@TestConfiguration` provides a pass-through `JwtDecoder` (token value = subject); `Authorization: Bearer <clerkId>` headers thread identity without real JWTs. 83 total tests (31 app + 52 domain), all green.
- [x] **T6 — Connection flow** — `ConnectionError` sealed interface (5 variants: NotFound, AlreadyExists, InvalidTransition, ProfileNotFound, NotRecipient). Extends `ConnectionRepository` port with `save`, `findById`, `existsBetween`. `RequestConnection` use case (load both profiles → check existing in either direction → create PENDING). `RespondToConnection` use case (load connection → assert PENDING → verify recipient by userId → transition). 13 domain unit tests (5 request + 8 respond). `ConnectionRepositoryAdapter` extended; `ConnectionJpaEntity` updated to let DB own `created_at`; JPA `existsBetweenUsers` query checks both orderings. `ConnectionController`: `POST /api/v1/connections` (201 + Location) and `PATCH /api/v1/connections/{id}` (200 / 409 / 403 / 404). 10 `ConnectionControllerIT` tests.
- [x] **T5 — Matching engine** — `MatchCandidateFinder` + `ConnectionRepository` ports; `MatchScorer` (Jaccard 85% + recency 15%); `FindMatches` use case (geo-filter → score → exclude accepted/declined → sort desc). 17 domain unit tests (scoring edge cases + exclusion logic, no DB). PostGIS `ST_DWithin` adapter + `ConnectionRepositoryAdapter`. `GET /api/v1/matches?profileId=&radius=`. 6 `MatchControllerIT` tests verify geo-filter, exclusions, score ordering, and valid score range.
- [x] **T4 — Profile CRUD** — `Result<V,E>` sealed type + `ProfileRepository` port + `CreateProfile`/`FetchProfile`/`UpdateProfile` use cases in domain (8 unit tests, no Spring). JPA adapter via Hibernate 6 `@JdbcTypeCode(ARRAY)` for `text[]`; PostGIS location via `JdbcTemplate` (no extra dep). REST at `/api/v1/profiles` with 201+Location header, 404/409 structured errors. 7 `ProfileControllerIT` tests against real PostGIS.
- [x] **T3 — Database migrations** — V1 users, V2 profiles (interests as text[], age check), V3 PostGIS extension + geography(point) column + GIST index, V4 connections (no-self-connect + unique-pair constraints). Dev seed in `db/seed/V5` (20 Brooklyn profiles, active in dev profile only). 5 SchemaIT tests verify inserts, PostGIS point, and self-connect rejection.
- [x] **T2 — Domain model (pure)** — 7 types, all records/sealed interfaces, zero framework imports. 16 unit tests green (GeoLocation bounds, InterestTag blank/null, MatchScore range). `MatchCandidate` implements `Comparable` for score-desc sort.
- [x] **T1 — Monorepo scaffold** — `./gradlew build` green; Spring Boot 3.5.0 (3.3.x EOL'd on Initializr), Gradle 8.14.5 via wrapper + Foojay toolchain resolver (auto-downloads JDK 21). `HealthCheckIT` spins up real PostGIS 16 via Testcontainers, hits `/actuator/health`, passes.
