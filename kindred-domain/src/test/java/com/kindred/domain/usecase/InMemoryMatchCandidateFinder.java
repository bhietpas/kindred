package com.kindred.domain.usecase;

import com.kindred.domain.model.GeoLocation;
import com.kindred.domain.model.Profile;
import com.kindred.domain.port.MatchCandidateFinder;

import java.util.ArrayList;
import java.util.List;

/** Returns a pre-loaded list regardless of origin/radius — unit tests control the candidate set. */
class InMemoryMatchCandidateFinder implements MatchCandidateFinder {

    private final List<Profile> candidates = new ArrayList<>();

    void add(Profile profile) {
        candidates.add(profile);
    }

    @Override
    public List<Profile> findWithinRadius(GeoLocation origin, double radiusMiles) {
        return List.copyOf(candidates);
    }
}
