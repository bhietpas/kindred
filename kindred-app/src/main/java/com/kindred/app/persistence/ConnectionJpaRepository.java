package com.kindred.app.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

interface ConnectionJpaRepository extends JpaRepository<ConnectionJpaEntity, UUID> {

    @Query("FROM ConnectionJpaEntity c WHERE c.requesterId = :userId OR c.recipientId = :userId")
    List<ConnectionJpaEntity> findAllInvolvingUser(@Param("userId") UUID userId);

    @Query("""
            SELECT COUNT(c) > 0 FROM ConnectionJpaEntity c
            WHERE (c.requesterId = :a AND c.recipientId = :b)
               OR (c.requesterId = :b AND c.recipientId = :a)
            """)
    boolean existsBetweenUsers(@Param("a") UUID userIdA, @Param("b") UUID userIdB);
}
