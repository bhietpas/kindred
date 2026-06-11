package com.kindred.domain.usecase;

import com.kindred.domain.error.ProfileError;
import com.kindred.domain.model.GeoLocation;
import com.kindred.domain.model.InterestTag;
import com.kindred.domain.model.Profile;
import com.kindred.domain.model.Result;
import com.kindred.domain.port.ProfileRepository;

import java.time.Clock;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public class UpdateProfile {

    public record Command(
            UUID profileId,
            String name,
            int age,
            String bio,
            String city,
            List<InterestTag> interests,
            boolean availableToHang,
            GeoLocation location       // nullable — clearing location is not supported here
    ) {}

    private final ProfileRepository profiles;
    private final Clock clock;

    public UpdateProfile(ProfileRepository profiles, Clock clock) {
        this.profiles = profiles;
        this.clock = clock;
    }

    public Result<Profile, ProfileError> execute(Command cmd) {
        return profiles.findById(cmd.profileId())
                .map(existing -> {
                    Profile updated = new Profile(
                            existing.id(),
                            existing.userId(),        // userId is immutable
                            cmd.name(),
                            cmd.age(),
                            cmd.bio(),
                            cmd.city(),
                            cmd.location(),
                            List.copyOf(cmd.interests()),
                            cmd.availableToHang(),
                            Instant.now(clock)
                    );
                    return Result.<Profile, ProfileError>success(profiles.save(updated));
                })
                .orElseGet(() -> Result.failure(new ProfileError.NotFound(cmd.profileId())));
    }
}
