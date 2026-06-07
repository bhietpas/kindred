package com.kindred.domain.port;

import com.kindred.domain.model.Profile;

import java.util.Optional;
import java.util.UUID;

/**
 * Port — the domain's view of profile persistence.
 * Implemented in the app layer by a JPA adapter.
 */
public interface ProfileRepository {

    Profile save(Profile profile);

    Optional<Profile> findById(UUID id);

    Optional<Profile> findByUserId(UUID userId);
}
