package com.kindred.app.persistence;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

/**
 * App-layer bridge from Clerk identity to our internal user UUID.
 * Keeps auth concerns out of domain use cases.
 */
@Component
public class UserLookup {

    private final UserJpaRepository users;

    public UserLookup(UserJpaRepository users) {
        this.users = users;
    }

    /** Returns the internal user UUID for the given Clerk ID, or empty if not found. */
    @Transactional(readOnly = true)
    public Optional<UUID> findUserId(String clerkId) {
        return users.findByAuthId(clerkId).map(UserJpaEntity::getId);
    }

    /**
     * Returns the internal user UUID for the given Clerk ID, creating the user record
     * if it does not yet exist. Used during profile creation (the user's onboarding call).
     */
    @Transactional
    public UUID getOrCreateUserId(String clerkId) {
        return users.findByAuthId(clerkId)
                .map(UserJpaEntity::getId)
                .orElseGet(() -> {
                    UserJpaEntity newUser = new UserJpaEntity(UUID.randomUUID(), clerkId);
                    return users.save(newUser).getId();
                });
    }
}
