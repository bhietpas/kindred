package com.kindred.app.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.Array;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "profiles")
class ProfileJpaEntity {

    @Id
    private UUID id;

    @Column(name = "user_id", nullable = false, unique = true)
    private UUID userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int age;

    private String bio;

    private String city;

    // Mapped as a native PostgreSQL text[] array.
    // Location (geography column) is handled separately via JdbcTemplate
    // to avoid a hibernate-spatial dependency.
    @Column(name = "interests", columnDefinition = "text[]")
    @JdbcTypeCode(SqlTypes.ARRAY)
    @Array(length = 255)
    private String[] interests;

    @Column(name = "available_to_hang", nullable = false)
    private boolean availableToHang;

    @Column(name = "last_active_at", nullable = false)
    private Instant lastActiveAt;

    // location geography column is intentionally excluded from JPA mapping;
    // reads and writes go through JdbcTemplate in ProfileRepositoryAdapter.

    protected ProfileJpaEntity() {}

    ProfileJpaEntity(UUID id, UUID userId, String name, int age, String bio,
                     String city, String[] interests, boolean availableToHang,
                     Instant lastActiveAt) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.age = age;
        this.bio = bio;
        this.city = city;
        this.interests = interests;
        this.availableToHang = availableToHang;
        this.lastActiveAt = lastActiveAt;
    }

    UUID getId() { return id; }
    UUID getUserId() { return userId; }
    String getName() { return name; }
    int getAge() { return age; }
    String getBio() { return bio; }
    String getCity() { return city; }
    String[] getInterests() { return interests; }
    boolean isAvailableToHang() { return availableToHang; }
    Instant getLastActiveAt() { return lastActiveAt; }
}
