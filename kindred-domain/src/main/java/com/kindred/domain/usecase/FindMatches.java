package com.kindred.domain.usecase;

import com.kindred.domain.error.ProfileError;
import com.kindred.domain.model.Connection;
import com.kindred.domain.model.InterestTag;
import com.kindred.domain.model.MatchCandidate;
import com.kindred.domain.model.Profile;
import com.kindred.domain.model.Result;
import com.kindred.domain.port.ConnectionRepository;
import com.kindred.domain.port.MatchCandidateFinder;
import com.kindred.domain.port.ProfileRepository;

import java.time.Clock;
import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class FindMatches {

    public record Query(UUID requestingProfileId, double radiusMiles) {}

    private final ProfileRepository profiles;
    private final MatchCandidateFinder finder;
    private final ConnectionRepository connections;
    private final Clock clock;

    public FindMatches(ProfileRepository profiles, MatchCandidateFinder finder,
                       ConnectionRepository connections, Clock clock) {
        this.profiles    = profiles;
        this.finder      = finder;
        this.connections = connections;
        this.clock       = clock;
    }

    public Result<List<MatchCandidate>, ProfileError> execute(Query query) {
        // 1. Load the requesting user's profile
        var maybeRequester = profiles.findById(query.requestingProfileId());
        if (maybeRequester.isEmpty()) {
            return Result.failure(new ProfileError.NotFound(query.requestingProfileId()));
        }
        Profile requester = maybeRequester.get();

        // 2. No location → cannot geo-filter → empty results
        if (requester.location() == null) {
            return Result.success(List.of());
        }

        // 3. Geo-filter via the port (PostGIS in production)
        List<Profile> nearby = finder.findWithinRadius(requester.location(), query.radiusMiles());

        // 4. Build the exclusion set: self + accepted + declined connections
        Set<UUID> excluded = excludedUserIds(requester.userId());

        // 5. Score, filter, sort
        Instant now = Instant.now(clock);
        Set<String> requesterTags = tagSet(requester);

        List<MatchCandidate> candidates = nearby.stream()
                .filter(p -> !excluded.contains(p.userId()))
                .map(p -> new MatchCandidate(p, MatchScorer.score(p, requesterTags, now)))
                .sorted()  // MatchCandidate.compareTo → score desc
                .toList();

        return Result.success(candidates);
    }

    private Set<UUID> excludedUserIds(UUID requestingUserId) {
        Set<UUID> excluded = new HashSet<>();
        excluded.add(requestingUserId); // always exclude self

        connections.findInvolvingUser(requestingUserId).forEach(conn -> {
            // Only exclude finalised relationships — PENDING still surfaces in matches
            if (conn.status() == Connection.Status.ACCEPTED
                    || conn.status() == Connection.Status.DECLINED) {
                UUID other = conn.requesterId().equals(requestingUserId)
                        ? conn.recipientId()
                        : conn.requesterId();
                excluded.add(other);
            }
        });

        return excluded;
    }

    private static Set<String> tagSet(Profile p) {
        return p.interests().stream().map(InterestTag::value).collect(Collectors.toSet());
    }
}
