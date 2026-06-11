package com.kindred.domain.error;

import com.kindred.domain.model.Connection;

import java.util.UUID;

/**
 * Domain errors for connection operations. Mapped to HTTP responses at the web boundary only.
 */
public sealed interface ConnectionError
        permits ConnectionError.NotFound, ConnectionError.AlreadyExists,
                ConnectionError.InvalidTransition, ConnectionError.ProfileNotFound,
                ConnectionError.NotRecipient {

    /** No connection exists with the given id. */
    record NotFound(UUID connectionId) implements ConnectionError {}

    /** A connection already exists between these two users (in either direction). */
    record AlreadyExists(UUID requesterId, UUID recipientId) implements ConnectionError {}

    /** The requested status transition is not allowed from the current state. */
    record InvalidTransition(Connection.Status from, Connection.Status to) implements ConnectionError {}

    /** No profile exists for the given id (used when looking up requester or recipient profile). */
    record ProfileNotFound(UUID profileId) implements ConnectionError {}

    /** The responding user is not the recipient of this connection. */
    record NotRecipient(UUID connectionId) implements ConnectionError {}
}
