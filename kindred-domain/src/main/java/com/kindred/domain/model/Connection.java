package com.kindred.domain.model;

import java.util.UUID;

/**
 * A directional friendship request between two users.
 * The requester initiates; the recipient accepts or declines.
 * Declined connections are remembered so the pair never resurfaces in matching.
 */
public record Connection(
        UUID id,
        UUID requesterId,
        UUID recipientId,
        Status status
) {

    public enum Status {
        PENDING,
        ACCEPTED,
        DECLINED
    }
}
