package com.kindred.domain.usecase;

import com.kindred.domain.error.ProfileError;
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

class CreateProfileTest {

    private final InMemoryProfileRepository repository = new InMemoryProfileRepository();
    private final Clock clock = Clock.fixed(Instant.parse("2026-06-06T12:00:00Z"), ZoneOffset.UTC);
    private final CreateProfile useCase = new CreateProfile(repository, clock);

    @Test
    void createsProfileAndReturnsItWithGeneratedId() {
        var cmd = new CreateProfile.Command(
                UUID.randomUUID(), "Jamie", 28, "Good bio", "Brooklyn",
                List.of(new InterestTag("Coffee"), new InterestTag("Hiking")),
                true, null);

        Result<Profile, ProfileError> result = useCase.execute(cmd);

        assertThat(result).isInstanceOf(Result.Success.class);
        Profile profile = ((Result.Success<Profile, ProfileError>) result).value();
        assertThat(profile.id()).isNotNull();
        assertThat(profile.name()).isEqualTo("Jamie");
        assertThat(profile.age()).isEqualTo(28);
        assertThat(profile.availableToHang()).isTrue();
        assertThat(profile.lastActiveAt()).isEqualTo(Instant.parse("2026-06-06T12:00:00Z"));
        assertThat(profile.interests()).containsExactly(new InterestTag("Coffee"), new InterestTag("Hiking"));
    }

    @Test
    void rejectsSecondProfileForSameUser() {
        UUID userId = UUID.randomUUID();
        var cmd = new CreateProfile.Command(userId, "Jamie", 28, "bio", "Brooklyn", List.of(), false, null);

        useCase.execute(cmd); // first — succeeds
        Result<Profile, ProfileError> second = useCase.execute(cmd);

        assertThat(second).isInstanceOf(Result.Failure.class);
        ProfileError error = ((Result.Failure<Profile, ProfileError>) second).error();
        assertThat(error).isInstanceOf(ProfileError.AlreadyExists.class);
        assertThat(((ProfileError.AlreadyExists) error).userId()).isEqualTo(userId);
    }

    @Test
    void persistsProfileInRepository() {
        UUID userId = UUID.randomUUID();
        var cmd = new CreateProfile.Command(userId, "Jamie", 28, "bio", "Brooklyn", List.of(), false, null);

        Result<Profile, ProfileError> result = useCase.execute(cmd);

        UUID profileId = ((Result.Success<Profile, ProfileError>) result).value().id();
        assertThat(repository.findById(profileId)).isPresent();
    }
}
