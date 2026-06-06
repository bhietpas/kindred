package com.kindred.domain.error;

import java.util.UUID;

/**
 * Domain errors for profile operations. These are mapped to HTTP responses
 * at the web boundary — the domain never touches HTTP status codes.
 */
public sealed interface ProfileError
        permits ProfileError.NotFound, ProfileError.AlreadyExists {

    /** No profile exists for the given id. */
    record NotFound(UUID profileId) implements ProfileError {}

    /** A profile already exists for this user. */
    record AlreadyExists(UUID userId) implements ProfileError {}
}
