package com.kindred.domain.usecase;

import com.kindred.domain.model.Profile;
import com.kindred.domain.port.ProfileRepository;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

/** Fast in-memory stand-in for unit tests. No Spring, no database. */
class InMemoryProfileRepository implements ProfileRepository {

    private final Map<UUID, Profile> store = new LinkedHashMap<>();

    @Override
    public Profile save(Profile profile) {
        store.put(profile.id(), profile);
        return profile;
    }

    @Override
    public Optional<Profile> findById(UUID id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public Optional<Profile> findByUserId(UUID userId) {
        return store.values().stream()
                .filter(p -> p.userId().equals(userId))
                .findFirst();
    }
}
