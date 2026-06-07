package com.kindred.domain.usecase;

import com.kindred.domain.error.ProfileError;
import com.kindred.domain.model.Profile;
import com.kindred.domain.model.Result;
import com.kindred.domain.port.ProfileRepository;

import java.util.UUID;

public class FetchProfile {

    private final ProfileRepository profiles;

    public FetchProfile(ProfileRepository profiles) {
        this.profiles = profiles;
    }

    public Result<Profile, ProfileError> byId(UUID profileId) {
        return profiles.findById(profileId)
                .map(Result::<Profile, ProfileError>success)
                .orElseGet(() -> Result.failure(new ProfileError.NotFound(profileId)));
    }
}
