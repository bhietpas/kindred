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

public class CreateProfile {

    public record Command(
            UUID userId,
            String name,
            int age,
            String bio,
            String city,
            List<InterestTag> interests,
            boolean availableToHang,
            GeoLocation location       // nullable — user may set this later
    ) {}

    private final ProfileRepository profiles;
    private final Clock clock;

    public CreateProfile(ProfileRepository profiles, Clock clock) {
        this.profiles = profiles;
        this.clock = clock;
    }

    public Result<Profile, ProfileError> execute(Command cmd) {
        if (profiles.findByUserId(cmd.userId()).isPresent()) {
            return Result.failure(new ProfileError.AlreadyExists(cmd.userId()));
        }

        Profile profile = new Profile(
                UUID.randomUUID(),
                cmd.userId(),
                cmd.name(),
                cmd.age(),
                cmd.bio(),
                cmd.city(),
                cmd.location(),
                List.copyOf(cmd.interests()),
                cmd.availableToHang(),
                Instant.now(clock)
        );

        return Result.success(profiles.save(profile));
    }
}
