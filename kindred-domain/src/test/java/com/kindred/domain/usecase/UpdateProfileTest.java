package com.kindred.domain.usecase;

import com.kindred.domain.error.ProfileError;
import com.kindred.domain.model.GeoLocation;
import com.kindred.domain.model.InterestTag;
import com.kindred.domain.model.Profile;
import com.kindred.domain.model.Result;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class UpdateProfileTest {

    private final InMemoryProfileRepository repository = new InMemoryProfileRepository();
    private final Clock createClock = Clock.fixed(Instant.parse("2026-06-06T10:00:00Z"), ZoneOffset.UTC);
    private final Clock updateClock = Clock.fixed(Instant.parse("2026-06-06T15:00:00Z"), ZoneOffset.UTC);
    private final CreateProfile createProfile = new CreateProfile(repository, createClock);
    private final UpdateProfile updateProfile = new UpdateProfile(repository, updateClock);

    @Test
    void updatesAllFieldsOnExistingProfile() {
        UUID userId = UUID.randomUUID();
        var createCmd = new CreateProfile.Command(userId, "Jamie", 28, "old bio", "Brooklyn", List.of(), false, null);
        UUID profileId = ((Result.Success<Profile, ProfileError>) createProfile.execute(createCmd)).value().id();

        var updateCmd = new UpdateProfile.Command(
                profileId, "Jamie R.", 29, "new bio", "Park Slope",
                List.of(new InterestTag("Coffee")), true,
                new GeoLocation(40.6782, -73.9442));

        Result<Profile, ProfileError> result = updateProfile.execute(updateCmd);

        assertThat(result).isInstanceOf(Result.Success.class);
        Profile updated = ((Result.Success<Profile, ProfileError>) result).value();
        assertThat(updated.id()).isEqualTo(profileId);
        assertThat(updated.userId()).isEqualTo(userId); // preserved
        assertThat(updated.name()).isEqualTo("Jamie R.");
        assertThat(updated.age()).isEqualTo(29);
        assertThat(updated.bio()).isEqualTo("new bio");
        assertThat(updated.city()).isEqualTo("Park Slope");
        assertThat(updated.availableToHang()).isTrue();
        assertThat(updated.location()).isEqualTo(new GeoLocation(40.6782, -73.9442));
        assertThat(updated.lastActiveAt()).isEqualTo(Instant.parse("2026-06-06T15:00:00Z"));
    }

    @Test
    void returnsNotFoundWhenProfileDoesNotExist() {
        var cmd = new UpdateProfile.Command(
                UUID.randomUUID(), "Jamie", 28, "bio", "Brooklyn", List.of(), false, null);

        Result<Profile, ProfileError> result = updateProfile.execute(cmd);

        assertThat(result).isInstanceOf(Result.Failure.class);
        assertThat(((Result.Failure<Profile, ProfileError>) result).error())
                .isInstanceOf(ProfileError.NotFound.class);
    }
}
