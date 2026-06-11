package com.kindred.domain.usecase;

import com.kindred.domain.error.ConnectionError;
import com.kindred.domain.model.Connection;
import com.kindred.domain.model.GeoLocation;
import com.kindred.domain.model.InterestTag;
import com.kindred.domain.model.Profile;
import com.kindred.domain.model.Result;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class RequestConnectionTest {

    static final GeoLocation BROOKLYN = new GeoLocation(40.6782, -73.9442);

    final UUID requesterUserId  = UUID.fromString("00000000-0000-0000-0000-000000000001");
    final UUID recipientUserId  = UUID.fromString("00000000-0000-0000-0000-000000000002");

    InMemoryProfileRepository profiles;
    InMemoryConnectionRepository connections;
    RequestConnection useCase;

    Profile requesterProfile;
    Profile recipientProfile;

    @BeforeEach
    void setUp() {
        profiles    = new InMemoryProfileRepository();
        connections = new InMemoryConnectionRepository();
        useCase     = new RequestConnection(profiles, connections);

        requesterProfile = profile(requesterUserId, "Alice");
        recipientProfile = profile(recipientUserId, "Bob");
        profiles.save(requesterProfile);
        profiles.save(recipientProfile);
    }

    @Test
    void createsPendingConnectionWhenBothProfilesExistAndNoPriorConnection() {
        Result<Connection, ConnectionError> result =
                useCase.execute(new RequestConnection.Command(requesterProfile.id(), recipientProfile.id()));

        assertThat(result).isInstanceOf(Result.Success.class);
        Connection conn = successOf(result);
        assertThat(conn.id()).isNotNull();
        assertThat(conn.requesterId()).isEqualTo(requesterUserId);
        assertThat(conn.recipientId()).isEqualTo(recipientUserId);
        assertThat(conn.status()).isEqualTo(Connection.Status.PENDING);
    }

    @Test
    void returnsProfileNotFoundWhenRequesterProfileDoesNotExist() {
        Result<Connection, ConnectionError> result =
                useCase.execute(new RequestConnection.Command(UUID.randomUUID(), recipientProfile.id()));

        assertThat(result).isInstanceOf(Result.Failure.class);
        assertThat(failureOf(result)).isInstanceOf(ConnectionError.ProfileNotFound.class);
    }

    @Test
    void returnsProfileNotFoundWhenRecipientProfileDoesNotExist() {
        Result<Connection, ConnectionError> result =
                useCase.execute(new RequestConnection.Command(requesterProfile.id(), UUID.randomUUID()));

        assertThat(result).isInstanceOf(Result.Failure.class);
        assertThat(failureOf(result)).isInstanceOf(ConnectionError.ProfileNotFound.class);
    }

    @Test
    void returnsAlreadyExistsWhenConnectionAlreadyExistsBetweenUsers() {
        connections.add(new Connection(UUID.randomUUID(),
                requesterUserId, recipientUserId, Connection.Status.PENDING));

        Result<Connection, ConnectionError> result =
                useCase.execute(new RequestConnection.Command(requesterProfile.id(), recipientProfile.id()));

        assertThat(result).isInstanceOf(Result.Failure.class);
        assertThat(failureOf(result)).isInstanceOf(ConnectionError.AlreadyExists.class);
    }

    @Test
    void returnsAlreadyExistsWhenConnectionExistsInReverseDirection() {
        // Recipient already requested requester
        connections.add(new Connection(UUID.randomUUID(),
                recipientUserId, requesterUserId, Connection.Status.PENDING));

        Result<Connection, ConnectionError> result =
                useCase.execute(new RequestConnection.Command(requesterProfile.id(), recipientProfile.id()));

        assertThat(result).isInstanceOf(Result.Failure.class);
        assertThat(failureOf(result)).isInstanceOf(ConnectionError.AlreadyExists.class);
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    @SuppressWarnings("unchecked")
    private static Connection successOf(Result<Connection, ConnectionError> r) {
        return ((Result.Success<Connection, ConnectionError>) r).value();
    }

    @SuppressWarnings("unchecked")
    private static ConnectionError failureOf(Result<Connection, ConnectionError> r) {
        return ((Result.Failure<Connection, ConnectionError>) r).error();
    }

    private static Profile profile(UUID userId, String name) {
        return new Profile(UUID.randomUUID(), userId, name, 28, "", "Brooklyn",
                BROOKLYN, List.of(new InterestTag("Coffee")), false, Instant.now());
    }
}
