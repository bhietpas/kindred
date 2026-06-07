package com.kindred.app.web;

import com.kindred.app.persistence.UserLookup;
import com.kindred.app.security.CurrentUser;
import com.kindred.domain.model.MatchCandidate;
import com.kindred.domain.model.Profile;
import com.kindred.domain.port.ProfileRepository;
import com.kindred.domain.model.Result;
import com.kindred.domain.usecase.FindMatches;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/matches")
class MatchController {

    private final FindMatches findMatches;
    private final ProfileRepository profiles;
    private final UserLookup userLookup;

    MatchController(FindMatches findMatches, ProfileRepository profiles, UserLookup userLookup) {
        this.findMatches = findMatches;
        this.profiles    = profiles;
        this.userLookup  = userLookup;
    }

    /** Returns ranked match candidates for the authenticated user. */
    @GetMapping
    ResponseEntity<?> getMatches(
            @AuthenticationPrincipal CurrentUser currentUser,
            @RequestParam(defaultValue = "25") double radius) {

        Optional<Profile> profile = userLookup.findUserId(currentUser.clerkId())
                .flatMap(profiles::findByUserId);

        if (profile.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new ErrorResponse("PROFILE_NOT_FOUND", "No profile found for authenticated user"));
        }

        return switch (findMatches.execute(new FindMatches.Query(profile.get().id(), radius))) {
            case Result.Success<?, ?> s -> {
                @SuppressWarnings("unchecked")
                List<MatchCandidate> candidates = (List<MatchCandidate>) s.value();
                yield ResponseEntity.ok(candidates.stream()
                        .map(MatchCandidateResponse::from)
                        .toList());
            }
            case Result.Failure<?, ?> f ->
                    ResponseEntity.status(404).body(
                            new ErrorResponse("PROFILE_NOT_FOUND", "Requesting profile not found"));
        };
    }
}
