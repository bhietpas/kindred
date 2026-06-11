# Kindred

A friend-finder backend. People build a profile and get matched with nearby,
compatible people based on shared interests and location.

---

## Tech Stack

| Layer       | Choice                                      |
|-------------|---------------------------------------------|
| Language    | Java 21 (records, sealed interfaces)        |
| Framework   | Spring Boot 3.5                             |
| Database    | PostgreSQL 16 + PostGIS (geo queries)       |
| Migrations  | Flyway                                      |
| Auth        | Clerk (JWT validated at the edge)           |
| Build       | Gradle 8 (Kotlin DSL, version catalog)      |
| Tests       | JUnit 5, AssertJ, Testcontainers            |

## Project Structure

```
kindred/
├── kindred-domain/   # Pure Java — entities, value objects, use cases, ports
│                     # Zero framework imports; fully unit-testable
└── kindred-app/      # Spring Boot — adapters and composition root
    ├── web/          # REST controllers, request/response records
    ├── persistence/  # JPA entities + repository adapters (PostGIS)
    ├── security/     # JWT → CurrentUser conversion
    └── config/       # Spring wiring, security filter chain
```

The domain knows nothing about Spring, JPA, or Clerk. Dependencies point inward.

---

## Local Setup

**Prerequisites:** Docker, Java 21. No other local installs needed (the Gradle
wrapper downloads everything else).

### 1. Start Postgres + PostGIS

```bash
docker-compose up -d
```

### 2. Run the API

```bash
./gradlew :kindred-app:bootRun
```

The server starts on `http://localhost:8080`.

### 3. Wire a real Clerk JWKS URI

```bash
export CLERK_JWKS_URI=https://<your-clerk-domain>.clerk.accounts.dev/.well-known/jwks.json
./gradlew :kindred-app:bootRun
```

Without this the server starts fine but rejects all JWT-bearing requests (a
placeholder JWKS URL is used so the app doesn't crash on startup).

---

## Running Tests

```bash
# All tests (unit + integration)
./gradlew test

# Domain unit tests only — fast, no Docker needed
./gradlew :kindred-domain:test

# App integration tests — Testcontainers spins up PostGIS automatically
./gradlew :kindred-app:test
```

---

## API Endpoints

All endpoints require `Authorization: Bearer <clerk-jwt>` except the health check.

| Method | Path                       | Description                               |
|--------|----------------------------|-------------------------------------------|
| GET    | `/actuator/health`         | Health check (no auth required)           |
| POST   | `/api/v1/profiles`         | Create a profile for the authenticated user |
| GET    | `/api/v1/profiles/{id}`    | Fetch a profile by ID                     |
| PUT    | `/api/v1/profiles/{id}`    | Update a profile                          |
| GET    | `/api/v1/matches?radius=`  | Scored match candidates within radius (miles) |
| GET    | `/api/v1/connections`      | List connections (optional `?status=` filter) |
| POST   | `/api/v1/connections`      | Send a connection request                 |
| PATCH  | `/api/v1/connections/{id}` | Accept or decline a pending connection    |
