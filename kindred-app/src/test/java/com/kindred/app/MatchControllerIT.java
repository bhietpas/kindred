package com.kindred.app;

import com.kindred.app.web.MatchCandidateResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Bean;
import org.springframework.core.ParameterizedTypeReference;
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
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class MatchControllerIT {

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

    // Requester — Brooklyn center, interests: Coffee + Hiking
    UUID requesterUserId;
    UUID requesterProfileId;
    String requesterClerkId;

    // Nearby candidate — ~0.5 miles away, interests: Coffee + Gaming
    UUID nearbyUserId;
    UUID nearbyProfileId;

    // Far candidate — Los Angeles (~2,450 miles away)
    UUID farUserId;
    UUID farProfileId;

    // Nearby but with ACCEPTED connection → should be excluded
    UUID connectedUserId;
    UUID connectedProfileId;

    // Nearby but DECLINED → should be excluded
    UUID declinedUserId;
    UUID declinedProfileId;

    @BeforeEach
    void setUp() {
        // Clean state between tests — connections reference users/profiles so order matters
        jdbc.update("DELETE FROM connections");
        jdbc.update("DELETE FROM profiles");
        jdbc.update("DELETE FROM users");

        requesterUserId    = UUID.randomUUID();
        requesterProfileId = UUID.randomUUID();
        requesterClerkId   = "clerk_req_" + requesterUserId;
        nearbyUserId       = UUID.randomUUID();
        nearbyProfileId    = UUID.randomUUID();
        farUserId          = UUID.randomUUID();
        farProfileId       = UUID.randomUUID();
        connectedUserId    = UUID.randomUUID();
        connectedProfileId = UUID.randomUUID();
        declinedUserId     = UUID.randomUUID();
        declinedProfileId  = UUID.randomUUID();

        insertUser(requesterUserId,  requesterClerkId);
        insertUser(nearbyUserId,     "clerk_near_" + nearbyUserId);
        insertUser(farUserId,        "clerk_far_"  + farUserId);
        insertUser(connectedUserId,  "clerk_conn_" + connectedUserId);
        insertUser(declinedUserId,   "clerk_dec_"  + declinedUserId);

        // Brooklyn center — 40.6782, -73.9442
        insertProfile(requesterProfileId, requesterUserId, "Requester",
                new String[]{"Coffee", "Hiking"}, -73.9442, 40.6782);

        // ~0.5 miles north in Brooklyn — 40.6836, -73.9442
        insertProfile(nearbyProfileId, nearbyUserId, "Nearby",
                new String[]{"Coffee", "Gaming"}, -73.9442, 40.6836);

        // Los Angeles — 34.0522, -118.2437
        insertProfile(farProfileId, farUserId, "FarAway",
                new String[]{"Coffee"}, -118.2437, 34.0522);

        // Nearby — connected (ACCEPTED)
        insertProfile(connectedProfileId, connectedUserId, "Connected",
                new String[]{"Hiking"}, -73.9460, 40.6800);
        insertConnection(requesterUserId, connectedUserId, "ACCEPTED");

        // Nearby — declined
        insertProfile(declinedProfileId, declinedUserId, "Declined",
                new String[]{"Coffee"}, -73.9430, 40.6790);
        insertConnection(requesterUserId, declinedUserId, "DECLINED");
    }

    @Test
    void returnsNearbyProfilesWithinRadius() {
        List<MatchCandidateResponse> matches = getMatches(5.0);

        List<String> names = matches.stream().map(m -> m.profile().name()).toList();
        assertThat(names).contains("Nearby");
        assertThat(names).doesNotContain("FarAway");
    }

    @Test
    void excludesAcceptedAndDeclinedConnections() {
        List<MatchCandidateResponse> matches = getMatches(5.0);

        List<String> names = matches.stream().map(m -> m.profile().name()).toList();
        assertThat(names).doesNotContain("Connected", "Declined");
    }

    @Test
    void excludesRequesterFromOwnResults() {
        List<MatchCandidateResponse> matches = getMatches(5.0);

        assertThat(matches.stream().map(m -> m.profile().name()))
                .doesNotContain("Requester");
    }

    @Test
    void scoresAreNonNegativeAndAtMostOne() {
        List<MatchCandidateResponse> matches = getMatches(5.0);

        assertThat(matches).isNotEmpty();
        matches.forEach(m -> {
            assertThat(m.score()).isGreaterThanOrEqualTo(0.0);
            assertThat(m.score()).isLessThanOrEqualTo(1.0);
        });
    }

    @Test
    void nearbyProfileWithSharedInterestScoresHigherThanNoOverlap() {
        UUID noMatchUser    = UUID.randomUUID();
        UUID noMatchProfile = UUID.randomUUID();
        insertUser(noMatchUser, "clerk_nomatch_" + noMatchUser);
        insertProfile(noMatchProfile, noMatchUser, "NoMatch",
                new String[]{"Gaming"}, -73.9450, 40.6800);

        List<MatchCandidateResponse> matches = getMatches(5.0);

        MatchCandidateResponse nearby  = findByName(matches, "Nearby");
        MatchCandidateResponse noMatch = findByName(matches, "NoMatch");

        assertThat(nearby.score()).isGreaterThan(noMatch.score());
    }

    @Test
    void returnsEmptyForProfileWithNoLocation() {
        UUID noLocUser    = UUID.randomUUID();
        UUID noLocProfile = UUID.randomUUID();
        String noLocClerkId = "clerk_noloc_" + noLocUser;
        insertUser(noLocUser, noLocClerkId);
        jdbc.update("""
                INSERT INTO profiles (id, user_id, name, age, bio, city, interests, available_to_hang, last_active_at)
                VALUES (?, ?, 'NoLoc', 28, '', 'Brooklyn', '{}', false, NOW())
                """, noLocProfile, noLocUser);

        List<MatchCandidateResponse> matches = getMatches(5.0, noLocClerkId);
        assertThat(matches).isEmpty();
    }

    @Test
    void returnsNotFoundWhenAuthenticatedUserHasNoProfile() {
        UUID noProfileUser = UUID.randomUUID();
        String noProfileClerkId = "clerk_noprofile_" + noProfileUser;
        insertUser(noProfileUser, noProfileClerkId);

        ResponseEntity<Void> response = restTemplate.exchange(
                url("/api/v1/matches?radius=5"),
                HttpMethod.GET,
                new HttpEntity<>(authHeaders(noProfileClerkId)),
                Void.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void returnsUnauthorizedWhenNotAuthenticated() {
        ResponseEntity<Void> response = restTemplate.exchange(
                url("/api/v1/matches?radius=5"),
                HttpMethod.GET, null, Void.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    private List<MatchCandidateResponse> getMatches(double radius) {
        return getMatches(radius, requesterClerkId);
    }

    private List<MatchCandidateResponse> getMatches(double radius, String clerkId) {
        ResponseEntity<List<MatchCandidateResponse>> response = restTemplate.exchange(
                url("/api/v1/matches?radius=" + radius),
                HttpMethod.GET,
                new HttpEntity<>(authHeaders(clerkId)),
                new ParameterizedTypeReference<>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        return response.getBody();
    }

    private MatchCandidateResponse findByName(List<MatchCandidateResponse> list, String name) {
        return list.stream().filter(m -> m.profile().name().equals(name)).findFirst()
                .orElseThrow(() -> new AssertionError("Candidate '" + name + "' not found in results"));
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

    private void insertProfile(UUID id, UUID userId, String name, String[] interests,
                               double lon, double lat) {
        jdbc.update("""
                INSERT INTO profiles (id, user_id, name, age, bio, city, interests, available_to_hang, last_active_at, location)
                VALUES (?, ?, ?, 28, '', 'Brooklyn', ?, false, NOW(),
                        ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography)
                """,
                id, userId, name,
                jdbc.getDataSource() != null
                        ? createSqlArray(interests)
                        : interests,
                lon, lat);
    }

    private void insertConnection(UUID requesterId, UUID recipientId, String status) {
        jdbc.update("""
                INSERT INTO connections (id, requester_id, recipient_id, status)
                VALUES (?, ?, ?, ?)
                """, UUID.randomUUID(), requesterId, recipientId, status);
    }

    private java.sql.Array createSqlArray(String[] values) {
        return jdbc.execute((java.sql.Connection conn) -> conn.createArrayOf("text", values));
    }
}
