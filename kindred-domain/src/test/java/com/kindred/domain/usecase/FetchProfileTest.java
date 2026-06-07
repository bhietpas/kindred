package com.kindred.domain.usecase;

import com.kindred.domain.error.ProfileError;
import com.kindred.domain.model.Profile;
import com.kindred.domain.model.Result;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class FetchProfileTest {

    private final InMemoryProfileRepository repository = new InMemoryProfileRepository();
    private final Clock clock = Clock.fixed(Instant.parse("2026-06-06T12:00:00Z"), ZoneOffset.UTC);
    private final CreateProfile createProfile = new CreateProfile(repository, clock);
    private final FetchProfile fetchProfile = new FetchProfile(repository);

    @Test
    void returnsProfileWhenItExists() {
        UUID userId = UUID.randomUUID();
        var cmd = new CreateProfile.Command(userId, "Jamie", 28, "bio", "Brooklyn", List.of(), false, null);
        UUID profileId = ((Result.Success<Profile, ProfileError>) createProfile.execute(cmd)).value().id();

        Result<Profile, ProfileError> result = fetchProfile.byId(profileId);

        assertThat(result).isInstanceOf(Result.Success.class);
        assertThat(((Result.Success<Profile, ProfileError>) result).value().name()).isEqualTo("Jamie");
    }

    @Test
    void returnsNotFoundWhenProfileDoesNotExist() {
        UUID missing = UUID.randomUUID();

        Result<Profile, ProfileError> result = fetchProfile.byId(missing);

        assertThat(result).isInstanceOf(Result.Failure.class);
        ProfileError error = ((Result.Failure<Profile, ProfileError>) result).error();
        assertThat(error).isInstanceOf(ProfileError.NotFound.class);
        assertThat(((ProfileError.NotFound) error).profileId()).isEqualTo(missing);
    }
}
