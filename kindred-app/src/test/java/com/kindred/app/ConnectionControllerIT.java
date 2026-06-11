package com.kindred.app;

import com.kindred.app.web.ConnectionResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class ConnectionControllerIT {

    @TestConfiguration
    static class TestJwtConfig {
        @Bean
        JwtDecoder jwtDecoder() {
            return tokenValue -> Jwt.withTokenValue(tokenValue)
                    .header("alg", "none")
                    .subject(tokenValue)
                    .issuedAt(Instant.now())
                    .expiresAt(Instant.now().plusSeconds(3600))
                    .build();
        }
    }

    static final DockerImageName POSTGIS_IMAGE = DockerImageName
            .parse("postgis/postgis:16-3.4")
            .asCompatibleSubstituteFor("postgres");

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(POSTGIS_IMAGE)
            .withDatabaseName("kindred")
            .withUsername("kindred")
            .withPassword("kindred");

    @DynamicPropertySource
    static void datasourceProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @LocalServerPort int port;
    @Autowired TestRestTemplate restTemplate;
    @Autowired JdbcTemplate jdbc;

    UUID requesterUserId;
    UUID requesterProfileId;
    String requesterClerkId;

    UUID recipientUserId;
    UUID recipientProfileId;
    String recipientClerkId;

    UUID otherUserId;
    UUID otherProfileId;
    String otherClerkId;

    @BeforeEach
    void setUp() {
        jdbc.update("DELETE FROM connections");
        jdbc.update("DELETE FROM profiles");
        jdbc.update("DELETE FROM users");

        requesterUserId    = UUID.randomUUID();
        requesterProfileId = UUID.randomUUID();
        requesterClerkId   = "clerk_req_"  + requesterUserId;

        recipientUserId    = UUID.randomUUID();
        recipientProfileId = UUID.randomUUID();
        recipientClerkId   = "clerk_rec_"  + recipientUserId;

        otherUserId    = UUID.randomUUID();
        otherProfileId = UUID.randomUUID();
        otherClerkId   = "clerk_other_" + otherUserId;

        insertUser(requesterUserId, requesterClerkId);
        insertUser(recipientUserId, recipientClerkId);
        insertUser(otherUserId,     otherClerkId);

        insertProfile(requesterProfileId, requesterUserId);
        insertProfile(recipientProfileId, recipientUserId);
        insertProfile(otherProfileId, otherUserId);
    }

    // ── GET /api/v1/connections ───────────────────────────────────────────

    @Test
    void returnsAllConnectionsForCurrentUser() {
        createPendingConnection();                        // requester → recipient
        postConnection(requesterProfileId, otherClerkId); // other → requester

        ResponseEntity<ConnectionResponse[]> response = getConnections(requesterClerkId, null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).hasSize(2);
    }

    @Test
    void returnsOnlyConnectionsMatchingStatusFilter() {
        UUID connectionId = createPendingConnection();        // requester → recipient PENDING
        patchConnection(connectionId, "ACCEPTED", recipientClerkId); // → ACCEPTED
        postConnection(requesterProfileId, otherClerkId);    // other → requester PENDING

        ResponseEntity<ConnectionResponse[]> response = getConnections(requesterClerkId, "ACCEPTED");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).hasSize(1);
        assertThat(response.getBody()[0].status()).isEqualTo("ACCEPTED");
    }

    @Test
    void returnsEmptyListWhenUserHasNoConnections() {
        ResponseEntity<ConnectionResponse[]> response = getConnections(requesterClerkId, null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEmpty();
    }

    @Test
    void returnsBadRequestForInvalidStatusParam() {
        ResponseEntity<String> response = restTemplate.exchange(
                url("/api/v1/connections?status=BOGUS"),
                HttpMethod.GET,
                new HttpEntity<>(authHeaders(requesterClerkId)),
                String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    // ── POST /api/v1/connections ──────────────────────────────────────────

    @Test
    void requestsConnectionAndReturns201() {
        ResponseEntity<ConnectionResponse> response = postConnection(recipientProfileId, requesterClerkId);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        ConnectionResponse body = response.getBody();
        assertThat(body).isNotNull();
        assertThat(body.id()).isNotNull();
        assertThat(body.requesterId()).isEqualTo(requesterUserId);
        assertThat(body.recipientId()).isEqualTo(recipientUserId);
        assertThat(body.status()).isEqualTo("PENDING");
        assertThat(response.getHeaders().getLocation()).isNotNull();
    }

    @Test
    void returnsConflictWhenConnectionAlreadyExists() {
        postConnection(recipientProfileId, requesterClerkId);

        ResponseEntity<ConnectionResponse> second = postConnection(recipientProfileId, requesterClerkId);

        assertThat(second.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
    }

    @Test
    void returnsConflictWhenConnectionAlreadyExistsInReverseDirection() {
        // Recipient initiates first
        postConnection(requesterProfileId, recipientClerkId);

        // Requester tries to initiate — should conflict
        ResponseEntity<ConnectionResponse> second = postConnection(recipientProfileId, requesterClerkId);

        assertThat(second.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
    }

    @Test
    void returnsNotFoundWhenRecipientProfileDoesNotExist() {
        ResponseEntity<ConnectionResponse> response = postConnection(UUID.randomUUID(), requesterClerkId);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    // ── PATCH /api/v1/connections/{id} ────────────────────────────────────

    @Test
    void acceptsConnectionAndReturns200() {
        UUID connectionId = createPendingConnection();

        ResponseEntity<ConnectionResponse> response = patchConnection(connectionId, "ACCEPTED", recipientClerkId);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().status()).isEqualTo("ACCEPTED");
    }

    @Test
    void declinesConnectionAndReturns200() {
        UUID connectionId = createPendingConnection();

        ResponseEntity<ConnectionResponse> response = patchConnection(connectionId, "DECLINED", recipientClerkId);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().status()).isEqualTo("DECLINED");
    }

    @Test
    void returnsConflictWhenRespondingToAlreadyAcceptedConnection() {
        UUID connectionId = createPendingConnection();
        patchConnection(connectionId, "ACCEPTED", recipientClerkId);

        ResponseEntity<ConnectionResponse> second = patchConnection(connectionId, "DECLINED", recipientClerkId);

        assertThat(second.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
    }

    @Test
    void returnsForbiddenWhenResponderIsNotTheRecipient() {
        UUID connectionId = createPendingConnection();

        // otherProfile is not the recipient
        ResponseEntity<ConnectionResponse> response = patchConnection(connectionId, "ACCEPTED", otherClerkId);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    void returnsNotFoundWhenConnectionDoesNotExistForResponse() {
        ResponseEntity<ConnectionResponse> response =
                patchConnection(UUID.randomUUID(), "ACCEPTED", recipientClerkId);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    /** GET connections for the given clerkId, with an optional status filter. */
    private ResponseEntity<ConnectionResponse[]> getConnections(String asClerkId, String status) {
        String path = "/api/v1/connections" + (status != null ? "?status=" + status : "");
        return restTemplate.exchange(
                url(path),
                HttpMethod.GET,
                new HttpEntity<>(authHeaders(asClerkId)),
                ConnectionResponse[].class);
    }

    /** POST as the given clerkId, requesting connection to recipientProfileId. */
    private ResponseEntity<ConnectionResponse> postConnection(UUID recipientProfileId, String asClerkId) {
        var body = Map.of("recipientProfileId", recipientProfileId);
        return restTemplate.postForEntity(
                url("/api/v1/connections"),
                new HttpEntity<>(body, authHeaders(asClerkId)),
                ConnectionResponse.class);
    }

    /** PATCH as the given clerkId, transitioning the connection to the given status. */
    private ResponseEntity<ConnectionResponse> patchConnection(UUID connectionId, String status, String asClerkId) {
        var body = Map.of("status", status);
        return restTemplate.exchange(
                url("/api/v1/connections/" + connectionId),
                HttpMethod.PATCH,
                new HttpEntity<>(body, authHeaders(asClerkId)),
                ConnectionResponse.class);
    }

    /** Create a pending connection (requester → recipient) and return its ID. */
    private UUID createPendingConnection() {
        ResponseEntity<ConnectionResponse> response = postConnection(recipientProfileId, requesterClerkId);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        return response.getBody().id();
    }

    private HttpHeaders authHeaders(String clerkId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(clerkId);
        return headers;
    }

    private String url(String path) {
        return "http://localhost:" + port + path;
    }

    private void insertUser(UUID id, String authId) {
        jdbc.update("INSERT INTO users (id, auth_id) VALUES (?, ?)", id, authId);
    }

    private void insertProfile(UUID id, UUID userId) {
        jdbc.update("""
                INSERT INTO profiles (id, user_id, name, age, bio, city, interests, available_to_hang, last_active_at)
                VALUES (?, ?, 'TestUser', 28, '', 'Brooklyn', '{}', false, NOW())
                """, id, userId);
    }
}
