package com.kindred.app.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "users")
class UserJpaEntity {

    @Id
    private UUID id;

    @Column(name = "auth_id", nullable = false, unique = true)
    private String authId;

    protected UserJpaEntity() {}

    UserJpaEntity(UUID id, String authId) {
        this.id    = id;
        this.authId = authId;
    }

    UUID getId()     { return id; }
    String getAuthId() { return authId; }
}
