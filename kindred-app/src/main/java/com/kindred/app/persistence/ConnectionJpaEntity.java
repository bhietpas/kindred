package com.kindred.app.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "connections")
class ConnectionJpaEntity {

    @Id
    private UUID id;

    @Column(name = "requester_id", nullable = false)
    private UUID requesterId;

    @Column(name = "recipient_id", nullable = false)
    private UUID recipientId;

    @Column(nullable = false)
    private String status;

    // Managed entirely by the DB (DEFAULT NOW()); never written by JPA.
    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private Instant createdAt;

    protected ConnectionJpaEntity() {}

    /** Constructor for saves — created_at is supplied by the DB default. */
    ConnectionJpaEntity(UUID id, UUID requesterId, UUID recipientId, String status) {
        this.id          = id;
        this.requesterId = requesterId;
        this.recipientId = recipientId;
        this.status      = status;
    }

    UUID getId()          { return id; }
    UUID getRequesterId() { return requesterId; }
    UUID getRecipientId() { return recipientId; }
    String getStatus()    { return status; }
    Instant getCreatedAt(){ return createdAt; }
}
