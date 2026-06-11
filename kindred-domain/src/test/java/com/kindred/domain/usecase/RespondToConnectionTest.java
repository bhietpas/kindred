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

class RespondToConnectionTest {

    static final GeoLocation BROOKLYN = new GeoLocation(40.6782, -73.9442);

    final UUID requesterUserId = UUID.fromString("00000000-0000-0000-0000-000000000001");
    final UUID recipientUserId = UUID.fromString("00000000-0000-0000-0000-000000000002");
    final UUID otherUserId     = UUID.fromString("00000000-0000-0000-0000-000000000003");

    InMemoryProfileRepository profiles;
    InMemoryConnectionRepository connections;
    RespondToConnection useCase;

    Profile requesterProfile;
    Profile recipientProfile;
    Profile otherProfile;
    Connection pendingConnection;

    @BeforeEach
    void setUp() {
        profiles    = new InMemoryProfileRepository();
        connections = new InMemoryConnectionRepository();
        useCase     = new RespondToConnection(profiles, connections);

        requesterProfile  = profile(requesterUserId, "Alice");
        recipientProfile  = profile(recipientUserId, "Bob");
        otherProfile      = profile(otherUserId, "Carol");
        profiles.save(requesterProfile);
        profiles.save(recipientProfile);
        profiles.save(otherProfile);

        pendingConnection = new Connection(UUID.randomUUID(),
                requesterUserId, recipientUserId, Connection.Status.PENDING);
        connections.add(pendingConnection);
    }

    @Test
    void acceptsPendingConnectionSuccessfully() {
        Result<Connection, ConnectionError> result = useCase.execute(
                new RespondToConnection.Command(pendingConnection.id(), recipientProfile.id(), Connection.Status.ACCEPTED));

        assertThat(result).isInstanceOf(Result.Success.class);
        Connection updated = successOf(result);
        assertThat(updated.id()).isEqualTo(pendingConnection.id());
        assertThat(updated.status()).isEqualTo(Connection.Status.ACCEPTED);
    }

    @Test
    void declinesPendingConnectionSuccessfully() {
        Result<Connection, ConnectionError> result = useCase.execute(
                new RespondToConnection.Command(pendingConnection.id(), recipientProfile.id(), Connection.Status.DECLINED));

        assertThat(result).isInstanceOf(Result.Success.class);
        assertThat(successOf(result).status()).isEqualTo(Connection.Status.DECLINED);
    }

    @Test
    void returnsNotFoundWhenConnectionDoesNotExist() {
        Result<Connection, ConnectionError> result = useCase.execute(
                new RespondToConnection.Command(UUID.randomUUID(), recipientProfile.id(), Connection.Status.ACCEPTED));

        assertThat(result).isInstanceOf(Result.Failure.class);
        assertThat(failureOf(result)).isInstanceOf(ConnectionError.NotFound.class);
    }

    @Test
    void returnsProfileNotFoundWhenResponderProfileDoesNotExist() {
        Result<Connection, ConnectionError> result = useCase.execute(
                new RespondToConnection.Command(pendingConnection.id(), UUID.randomUUID(), Connection.Status.ACCEPTED));

        assertThat(result).isInstanceOf(Result.Failure.class);
        assertThat(failureOf(result)).isInstanceOf(ConnectionError.ProfileNotFound.class);
    }

    @Test
    void returnsNotRecipientWhenResponderIsNotTheRecipient() {
        // otherProfile is not the recipient of pendingConnection
        Result<Connection, ConnectionError> result = useCase.execute(
                new RespondToConnection.Command(pendingConnection.id(), otherProfile.id(), Connection.Status.ACCEPTED));

        assertThat(result).isInstanceOf(Result.Failure.class);
        assertThat(failureOf(result)).isInstanceOf(ConnectionError.NotRecipient.class);
    }

    @Test
    void returnsInvalidTransitionForAlreadyAcceptedConnection() {
        Connection accepted = new Connection(UUID.randomUUID(),
                requesterUserId, recipientUserId, Connection.Status.ACCEPTED);
        connections.add(accepted);

        Result<Connection, ConnectionError> result = useCase.execute(
                new RespondToConnection.Command(accepted.id(), recipientProfile.id(), Connection.Status.DECLINED));

        assertThat(result).isInstanceOf(Result.Failure.class);
        assertThat(failureOf(result)).isInstanceOf(ConnectionError.InvalidTransition.class);
    }

    @Test
    void returnsInvalidTransitionForAlreadyDeclinedConnection() {
        Connection declined = new Connection(UUID.randomUUID(),
                requesterUserId, recipientUserId, Connection.Status.DECLINED);
        connections.add(declined);

        Result<Connection, ConnectionError> result = useCase.execute(
                new RespondToConnection.Command(declined.id(), recipientProfile.id(), Connection.Status.ACCEPTED));

        assertThat(result).isInstanceOf(Result.Failure.class);
        assertThat(failureOf(result)).isInstanceOf(ConnectionError.InvalidTransition.class);
    }

    @Test
    void returnsInvalidTransitionWhenRespondingWithPending() {
        Result<Connection, ConnectionError> result = useCase.execute(
                new RespondToConnection.Command(pendingConnection.id(), recipientProfile.id(), Connection.Status.PENDING));

        assertThat(result).isInstanceOf(Result.Failure.class);
        assertThat(failureOf(result)).isInstanceOf(ConnectionError.InvalidTransition.class);
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
