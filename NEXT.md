# NEXT.md — Kindred

The single source of truth for what to work on. Always read `CLAUDE.md` first.

**Rule:** do ONE item from "In Progress" at a time. Finish it (test-first, green,
refactored), update this file, then STOP and wait. Do not pull the next item yourself.

---

## In Progress

*(nothing — waiting for next task)*

---

## Up Next (do not start until pulled into In Progress)

Ordered by shortest path to a complete match→connect loop in front of 5 real users;
ties broken by technical risk retired. Every slice below is verifiable end-to-end by
automated tests (domain unit tests + Testcontainers ITs). The one standing gap that
needs **human review** before the pilot: the real Clerk JWKS path — ITs substitute a
pass-through `JwtDecoder`, so verify token validation against live Clerk manually once.

- [ ] **T9 — Actionable connections list**
  *Outcome:* Listing my connections shows who the other person is and whether each
  request is incoming or outgoing, so I can act on pending requests.
  *Acceptance:*
  - As recipient of a PENDING request, `GET /api/v1/connections` item has
    `direction: "incoming"` and `otherProfile.name` equal to the requester's name.
  - The same connection fetched as the requester has `direction: "outgoing"` and
    `otherProfile` = the recipient's summary.
  - `otherProfile` contains profileId, name, age, city, interests — and **no**
    latitude/longitude.
  - A connection whose counterpart profile no longer exists is still returned, with
    `otherProfile: null`.
  - Existing status-filter ITs stay green.
  *Layers:* domain (`ListConnections` returns connection + other-profile pairs via
  the existing `ProfileRepository` port), web (new response record), IT.
  *Out of scope:* pagination, sorting, contact handle, match-card changes.

- [ ] **T10 — Fetch my own profile (`GET /api/v1/profiles/me`)**
  *Outcome:* A signed-in user can fetch their own profile — or learn they don't have
  one yet — without knowing any IDs.
  *Acceptance:*
  - Authenticated user with a profile → 200 + their `ProfileResponse`.
  - Authenticated user with no profile (or no users row) → 404 `PROFILE_NOT_FOUND`.
  - Unauthenticated → 401.
  *Layers:* web only (reuse `UserLookup` + `ProfileRepository.findByUserId`, same
  composition as `MatchController`).
  *Out of scope:* `/me` aliases for PUT/DELETE; any change to POST/PUT semantics.

- [ ] **T11 — Safe, stateful match cards**
  *Outcome:* Match results show distance and whether a request is already pending —
  and never reveal anyone's exact coordinates.
  *Acceptance:*
  - Match response JSON contains no `location`/`latitude`/`longitude` for candidates.
  - Each candidate has `distanceMiles`; a known two-point fixture asserts the
    expected miles within tolerance (pure haversine on `GeoLocation` in the domain —
    unit-testable; display-only precision).
  - A candidate with a PENDING connection (either direction) carries
    `pendingConnectionId`; others null.
  - Score-descending order unchanged.
  *Layers:* domain (`MatchCandidate`/`FindMatches` gain distance + pending
  annotation via the existing `ConnectionRepository`), web (`MatchCandidateResponse`
  reshaped, stops embedding full `ProfileResponse`), IT.
  *Out of scope:* excluding pending candidates from results, pagination,
  scoring-weight changes.

- [ ] **T12 — Contact reveal on accept**
  *Outcome:* Once a connection is accepted, each side sees the other's contact
  handle, so connected users can actually reach each other.
  *Acceptance:*
  - Migration V6 adds nullable `contact_handle` to profiles; create/update accept an
    optional `contactHandle`; own profile responses include it.
  - ACCEPTED connection: each side's `GET /connections` item includes the other
    party's `contactHandle`.
  - PENDING/DECLINED items: `contactHandle` is null.
  - Match cards never include `contactHandle`.
  *Layers:* db (Flyway V6), domain (`Profile` field + use-case commands), web, IT.
  *Out of scope:* messaging, handle-format validation (T13), notifications.

- [ ] **T13 — Input validation**
  *Outcome:* Garbage input gets a structured 400 instead of a 500 or corrupt data.
  *Acceptance:*
  - At least one invalid-input IT per mutating endpoint (blank name, out-of-range
    age/lat/lng, null `recipientProfileId`).
  - 400 body = `code: VALIDATION_FAILED` + message + `fields` list (extends the
    current two-field `ErrorResponse`).
  - Domain use-case guard checks unchanged — Bean Validation is an edge filter, not
    a substitute for domain rules.
  *Layers:* web (+ `spring-boot-starter-validation`, already approved), IT.
  *Out of scope:* rate limiting, bio-content sanitization, pagination.

---

## Parking Lot (not scheduled — ideas only, do not build)

- Cursor pagination on `GET /api/v1/matches` (demoted from Up Next — revisit when
  match lists exceed a screenful; irrelevant at 5-user pilot scale)
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
