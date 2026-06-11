package com.kindred.domain.usecase;

import com.kindred.domain.model.Connection;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class ListConnectionsTest {

    InMemoryConnectionRepository connections;
    ListConnections listConnections;

    UUID userId      = UUID.randomUUID();
    UUID otherUserA  = UUID.randomUUID();
    UUID otherUserB  = UUID.randomUUID();

    @BeforeEach
    void setUp() {
        connections   = new InMemoryConnectionRepository();
        listConnections = new ListConnections(connections);
    }

    @Test
    void returnsAllConnectionsWhenNoStatusFilter() {
        connections.add(pending(userId, otherUserA));
        connections.add(accepted(userId, otherUserB));

        List<Connection> result = listConnections.execute(
                new ListConnections.Query(userId, Optional.empty()));

        assertThat(result).hasSize(2);
    }

    @Test
    void returnsOnlyConnectionsMatchingStatusFilter() {
        connections.add(pending(userId, otherUserA));
        connections.add(accepted(userId, otherUserB));

        List<Connection> result = listConnections.execute(
                new ListConnections.Query(userId, Optional.of(Connection.Status.PENDING)));

        assertThat(result).hasSize(1);
        assertThat(result.get(0).status()).isEqualTo(Connection.Status.PENDING);
    }

    @Test
    void includesConnectionsWhereUserIsRecipient() {
        // userId is the recipient here
        connections.add(pending(otherUserA, userId));

        List<Connection> result = listConnections.execute(
                new ListConnections.Query(userId, Optional.empty()));

        assertThat(result).hasSize(1);
        assertThat(result.get(0).recipientId()).isEqualTo(userId);
    }

    @Test
    void returnsEmptyListWhenUserHasNoConnections() {
        connections.add(pending(otherUserA, otherUserB)); // unrelated connection

        List<Connection> result = listConnections.execute(
                new ListConnections.Query(userId, Optional.empty()));

        assertThat(result).isEmpty();
    }

    @Test
    void returnsEmptyListWhenStatusFilterMatchesNothing() {
        connections.add(pending(userId, otherUserA));

        List<Connection> result = listConnections.execute(
                new ListConnections.Query(userId, Optional.of(Connection.Status.ACCEPTED)));

        assertThat(result).isEmpty();
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    private Connection pending(UUID requester, UUID recipient) {
        return new Connection(UUID.randomUUID(), requester, recipient, Connection.Status.PENDING);
    }

    private Connection accepted(UUID requester, UUID recipient) {
        return new Connection(UUID.randomUUID(), requester, recipient, Connection.Status.ACCEPTED);
    }
}
