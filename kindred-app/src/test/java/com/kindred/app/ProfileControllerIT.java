package com.kindred.app;

import com.kindred.app.web.CreateProfileRequest;
import com.kindred.app.web.ProfileResponse;
import com.kindred.app.web.UpdateProfileRequest;
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
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class ProfileControllerIT {

    /**
     * Replaces the production NimbusJwtDecoder with a pass-through decoder.
     * Treats the raw Bearer token value as the Clerk ID (subject claim),
     * so tests can send {@code Authorization: Bearer <clerkId>} without signing real JWTs.
     */
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

    /**
     * The Clerk ID used as both the users.auth_id value and the Bearer token value.
     * {@link TestJwtDecoderConfig} treats the raw token as the subject claim.
     */
    String clerkId;

    @BeforeEach
    void setUp() {
        clerkId = "clerk_it_" + UUID.randomUUID();
        // Insert the user record — controller derives userId via UserLookup on POST /profiles.
        UUID userId = UUID.randomUUID();
        jdbc.update("INSERT INTO users (id, auth_id) VALUES (?, ?)", userId, clerkId);
    }

    // ── Tests ─────────────────────────────────────────────────────────────

    @Test
    void createProfileReturns201WithProfileBody() {
        var req = new CreateProfileRequest("Jamie", 28, "A good bio", "Brooklyn",
                List.of("Coffee", "Hiking"), true, null, null);

        ResponseEntity<ProfileResponse> response = post("/api/v1/profiles", req, ProfileResponse.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        ProfileResponse body = response.getBody();
        assertThat(body).isNotNull();
        assertThat(body.id()).isNotNull();
        assertThat(body.name()).isEqualTo("Jamie");
        assertThat(body.age()).isEqualTo(28);
        assertThat(body.interests()).containsExactlyInAnyOrder("Coffee", "Hiking");
    }

    @Test
    void createProfileReturnsLocationHeader() {
        var req = new CreateProfileRequest("Jamie", 28, "bio", "Brooklyn", List.of(), false, null, null);

        ResponseEntity<ProfileResponse> response = post("/api/v1/profiles", req, ProfileResponse.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getHeaders().getLocation()).isNotNull();
        assertThat(response.getHeaders().getLocation().toString()).contains("/api/v1/profiles/");
    }

    @Test
    void fetchProfileReturns200() {
        var create = new CreateProfileRequest("Jamie", 28, "bio", "Brooklyn",
                List.of("Coffee"), false, null, null);
        UUID profileId = post("/api/v1/profiles", create, ProfileResponse.class).getBody().id();

        ResponseEntity<ProfileResponse> response = get("/api/v1/profiles/" + profileId, ProfileResponse.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().name()).isEqualTo("Jamie");
    }

    @Test
    void fetchNonexistentProfileReturns404WithStructuredBody() {
        ResponseEntity<Map> response = get("/api/v1/profiles/" + UUID.randomUUID(), Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody()).containsKey("code");
        assertThat(response.getBody()).containsKey("message");
    }

    @Test
    void updateProfileReturns200WithUpdatedData() {
        var create = new CreateProfileRequest("Jamie", 28, "old bio", "Brooklyn", List.of(), false, null, null);
        UUID profileId = post("/api/v1/profiles", create, ProfileResponse.class).getBody().id();

        var update = new UpdateProfileRequest("Jamie R.", 29, "new bio", "Park Slope",
                List.of("Coffee", "Hiking"), true, 40.6782, -73.9442);

        ResponseEntity<ProfileResponse> response = restTemplate.exchange(
                url("/api/v1/profiles/" + profileId),
                HttpMethod.PUT,
                new HttpEntity<>(update, authHeaders()),
                ProfileResponse.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        ProfileResponse body = response.getBody();
        assertThat(body.name()).isEqualTo("Jamie R.");
        assertThat(body.age()).isEqualTo(29);
        assertThat(body.bio()).isEqualTo("new bio");
        assertThat(body.availableToHang()).isTrue();
        assertThat(body.location()).isNotNull();
        assertThat(body.location().latitude()).isEqualTo(40.6782);
    }

    @Test
    void updateNonexistentProfileReturns404() {
        var update = new UpdateProfileRequest("X", 25, "bio", "NYC", List.of(), false, null, null);

        ResponseEntity<Map> response = restTemplate.exchange(
                url("/api/v1/profiles/" + UUID.randomUUID()),
                HttpMethod.PUT,
                new HttpEntity<>(update, authHeaders()),
                Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void duplicateCreateReturns409() {
        var req = new CreateProfileRequest("Jamie", 28, "bio", "Brooklyn", List.of(), false, null, null);

        post("/api/v1/profiles", req, ProfileResponse.class);
        ResponseEntity<Map> second = post("/api/v1/profiles", req, Map.class);

        assertThat(second.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
    }

    @Test
    void requestWithoutAuthReturns401() {
        var req = new CreateProfileRequest("Jamie", 28, "bio", "Brooklyn", List.of(), false, null, null);

        // No auth header — just a plain POST
        ResponseEntity<Void> response = restTemplate.postForEntity(
                url("/api/v1/profiles"), req, Void.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    private HttpHeaders authHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(clerkId);
        return headers;
    }

    private <T> ResponseEntity<T> post(String path, Object body, Class<T> responseType) {
        return restTemplate.postForEntity(url(path), new HttpEntity<>(body, authHeaders()), responseType);
    }

    private <T> ResponseEntity<T> get(String path, Class<T> responseType) {
        return restTemplate.exchange(url(path), HttpMethod.GET,
                new HttpEntity<>(authHeaders()), responseType);
    }

    private String url(String path) {
        return "http://localhost:" + port + path;
    }
}
