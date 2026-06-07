package com.kindred.domain.port;

import com.kindred.domain.model.Connection;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Port — reads and writes connections to the data store.
 * Implemented in the app layer by a JPA adapter.
 */
public interface ConnectionRepository {

    /** Returns all connections where the given user is either requester or recipient. */
    List<Connection> findInvolvingUser(UUID userId);

    /** Returns the connection with the given id, if it exists. */
    Optional<Connection> findById(UUID id);

    /**
     * Returns true if any connection exists between the two users, regardless of direction or status.
     * Checks both (a→b) and (b→a) orderings.
     */
    boolean existsBetween(UUID userIdA, UUID userIdB);

    /** Persists a new connection or updates an existing one. Returns the saved connection. */
    Connection save(Connection connection);
}
