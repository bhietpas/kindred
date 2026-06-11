package com.kindred.app.web;

import com.kindred.domain.model.Connection;

import java.util.UUID;

/** Wire representation of a Connection sent to the client. */
public record ConnectionResponse(UUID id, UUID requesterId, UUID recipientId, String status) {

    public static ConnectionResponse from(Connection c) {
        return new ConnectionResponse(c.id(), c.requesterId(), c.recipientId(), c.status().name());
    }
}
