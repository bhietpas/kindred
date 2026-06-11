package com.kindred.domain.usecase;

import com.kindred.domain.model.Connection;
import com.kindred.domain.port.ConnectionRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Returns all connections involving the authenticated user, optionally filtered by status.
 * Includes connections where the user is either requester or recipient.
 */
public class ListConnections {

    public record Query(UUID userId, Optional<Connection.Status> statusFilter) {}

    private final ConnectionRepository connections;

    public ListConnections(ConnectionRepository connections) {
        this.connections = connections;
    }

    public List<Connection> execute(Query query) {
        List<Connection> all = connections.findInvolvingUser(query.userId());
        return query.statusFilter()
                .map(status -> all.stream().filter(c -> c.status() == status).toList())
                .orElse(all);
    }
}
