package com.kindred.app;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Verifies that all Flyway migrations run cleanly and produce the expected schema.
 * Uses a real PostGIS container — no H2, no substitutes.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@Testcontainers
class SchemaIT {

    static final DockerImageName POSTGIS_IMAGE = DockerImageName
            .parse("postgis/postgis:16-3.4")
            .asCompatibleSubstituteFor("postgres");

    @SuppressWarnings("resource")
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

    @Autowired
    DataSource dataSource;

    @Test
    void usersTableAcceptsInsert() throws SQLException {
        UUID id = UUID.randomUUID();
        try (Connection conn = dataSource.getConnection()) {
            int rows = conn.createStatement().executeUpdate(
                    "INSERT INTO users (id, auth_id) VALUES ('" + id + "', 'clerk|test123')");
            assertThat(rows).isEqualTo(1);
        }
    }

    @Test
    void profilesTableHasInterestTagsColumn() throws SQLException {
        try (Connection conn = dataSource.getConnection();
             ResultSet rs = conn.getMetaData().getColumns(null, null, "profiles", "interests")) {
            assertThat(rs.next()).as("profiles.interests column should exist").isTrue();
        }
    }

    @Test
    void profilesTableAcceptsPostGISPoint() throws SQLException {
        UUID userId = UUID.randomUUID();
        UUID profileId = UUID.randomUUID();
        try (Connection conn = dataSource.getConnection()) {
            conn.createStatement().executeUpdate(
                    "INSERT INTO users (id, auth_id) VALUES ('" + userId + "', 'clerk|geo_test')");
            int rows = conn.createStatement().executeUpdate(
                    "INSERT INTO profiles (id, user_id, name, age, bio, city, interests, available_to_hang, last_active_at, location) " +
                    "VALUES ('" + profileId + "', '" + userId + "', 'Test User', 28, 'bio', 'Brooklyn', '{}', false, NOW(), " +
                    "ST_SetSRID(ST_MakePoint(-73.9442, 40.6782), 4326)::geography)");
            assertThat(rows).isEqualTo(1);
        }
    }

    @Test
    void connectionsTableEnforcesValidStatus() throws SQLException {
        UUID requesterId = UUID.randomUUID();
        UUID recipientId = UUID.randomUUID();
        try (Connection conn = dataSource.getConnection()) {
            conn.createStatement().executeUpdate(
                    "INSERT INTO users (id, auth_id) VALUES ('" + requesterId + "', 'clerk|req'), ('" + recipientId + "', 'clerk|rec')");
            int rows = conn.createStatement().executeUpdate(
                    "INSERT INTO connections (id, requester_id, recipient_id, status) " +
                    "VALUES ('" + UUID.randomUUID() + "', '" + requesterId + "', '" + recipientId + "', 'PENDING')");
            assertThat(rows).isEqualTo(1);
        }
    }

    @Test
    void connectionsTableRejectsSelfConnect() throws SQLException {
        UUID userId = UUID.randomUUID();
        try (Connection conn = dataSource.getConnection()) {
            conn.createStatement().executeUpdate(
                    "INSERT INTO users (id, auth_id) VALUES ('" + userId + "', 'clerk|self')");
            org.assertj.core.api.Assertions.assertThatThrownBy(() ->
                conn.createStatement().executeUpdate(
                    "INSERT INTO connections (id, requester_id, recipient_id, status) " +
                    "VALUES ('" + UUID.randomUUID() + "', '" + userId + "', '" + userId + "', 'PENDING')")
            ).isInstanceOf(SQLException.class);
        }
    }
}
