package com.kindred.domain.model;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * A user's public-facing profile used for matching and display.
 *
 * {@code location} is optional — a profile without a location will not appear
 * in geo-filtered match results.
 *
 * {@code lastActiveAt} is set by the app layer using an injected Clock so the
 * domain never calls Instant.now() directly.
 */
public record Profile(
        UUID id,
        UUID userId,
        String name,
        int age,
        String bio,
        String city,
        GeoLocation location,       // nullable — user may not have set location yet
        List<InterestTag> interests,
        boolean availableToHang,
        Instant lastActiveAt
) {
}
