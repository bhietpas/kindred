package com.kindred.app.web;

import com.kindred.domain.model.GeoLocation;
import com.kindred.domain.model.InterestTag;
import com.kindred.domain.model.Profile;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record ProfileResponse(
        UUID id,
        UUID userId,
        String name,
        int age,
        String bio,
        String city,
        List<String> interests,
        boolean availableToHang,
        Instant lastActiveAt,
        LocationResponse location   // null when not yet set
) {

    public record LocationResponse(double latitude, double longitude) {}

    public static ProfileResponse from(Profile profile) {
        LocationResponse loc = profile.location() == null ? null
                : new LocationResponse(profile.location().latitude(), profile.location().longitude());
        List<String> tags = profile.interests().stream().map(InterestTag::value).toList();
        return new ProfileResponse(
                profile.id(), profile.userId(), profile.name(), profile.age(),
                profile.bio(), profile.city(), tags, profile.availableToHang(),
                profile.lastActiveAt(), loc);
    }
}
