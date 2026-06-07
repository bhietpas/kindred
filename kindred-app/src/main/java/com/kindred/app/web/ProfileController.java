package com.kindred.app.web;

import com.kindred.app.persistence.UserLookup;
import com.kindred.app.security.CurrentUser;
import com.kindred.domain.error.ProfileError;
import com.kindred.domain.model.GeoLocation;
import com.kindred.domain.model.InterestTag;
import com.kindred.domain.model.Result;
import com.kindred.domain.usecase.CreateProfile;
import com.kindred.domain.usecase.FetchProfile;
import com.kindred.domain.usecase.UpdateProfile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/profiles")
class ProfileController {

    private final CreateProfile createProfile;
    private final FetchProfile fetchProfile;
    private final UpdateProfile updateProfile;
    private final UserLookup userLookup;

    ProfileController(CreateProfile createProfile, FetchProfile fetchProfile,
                      UpdateProfile updateProfile, UserLookup userLookup) {
        this.createProfile = createProfile;
        this.fetchProfile  = fetchProfile;
        this.updateProfile = updateProfile;
        this.userLookup    = userLookup;
    }

    @PostMapping
    ResponseEntity<?> create(@AuthenticationPrincipal CurrentUser currentUser,
                              @RequestBody CreateProfileRequest req) {
        // User record is created on first profile call if it doesn't exist yet.
        UUID userId = userLookup.getOrCreateUserId(currentUser.clerkId());

        var cmd = new CreateProfile.Command(
                userId,
                req.name(),
                req.age(),
                req.bio(),
                req.city(),
                toTags(req.interests()),
                req.availableToHang(),
                toGeoLocation(req.latitude(), req.longitude()));

        return switch (createProfile.execute(cmd)) {
            case Result.Success<?, ?> s -> {
                ProfileResponse body = ProfileResponse.from((com.kindred.domain.model.Profile) s.value());
                yield ResponseEntity
                        .created(URI.create("/api/v1/profiles/" + body.id()))
                        .body(body);
            }
            case Result.Failure<?, ?> f -> toErrorResponse((ProfileError) f.error());
        };
    }

    @GetMapping("/{id}")
    ResponseEntity<?> fetch(@PathVariable UUID id) {
        return switch (fetchProfile.byId(id)) {
            case Result.Success<?, ?> s ->
                    ResponseEntity.ok(ProfileResponse.from((com.kindred.domain.model.Profile) s.value()));
            case Result.Failure<?, ?> f -> toErrorResponse((ProfileError) f.error());
        };
    }

    @PutMapping("/{id}")
    ResponseEntity<?> update(@PathVariable UUID id, @RequestBody UpdateProfileRequest req) {
        var cmd = new UpdateProfile.Command(
                id,
                req.name(),
                req.age(),
                req.bio(),
                req.city(),
                toTags(req.interests()),
                req.availableToHang(),
                toGeoLocation(req.latitude(), req.longitude()));

        return switch (updateProfile.execute(cmd)) {
            case Result.Success<?, ?> s ->
                    ResponseEntity.ok(ProfileResponse.from((com.kindred.domain.model.Profile) s.value()));
            case Result.Failure<?, ?> f -> toErrorResponse((ProfileError) f.error());
        };
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    private static List<InterestTag> toTags(List<String> raw) {
        if (raw == null) return List.of();
        return raw.stream().map(InterestTag::new).toList();
    }

    private static GeoLocation toGeoLocation(Double lat, Double lon) {
        if (lat == null || lon == null) return null;
        return new GeoLocation(lat, lon);
    }

    private static ResponseEntity<ErrorResponse> toErrorResponse(ProfileError error) {
        return switch (error) {
            case ProfileError.NotFound e ->
                    ResponseEntity.status(404).body(new ErrorResponse("PROFILE_NOT_FOUND",
                            "No profile found with id " + e.profileId()));
            case ProfileError.AlreadyExists e ->
                    ResponseEntity.status(409).body(new ErrorResponse("PROFILE_ALREADY_EXISTS",
                            "A profile already exists for user " + e.userId()));
        };
    }
}
