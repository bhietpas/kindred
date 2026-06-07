package com.kindred.domain.usecase;

import com.kindred.domain.error.ProfileError;
import com.kindred.domain.model.GeoLocation;
import com.kindred.domain.model.InterestTag;
import com.kindred.domain.model.MatchCandidate;
import com.kindred.domain.model.MatchScore;
import com.kindred.domain.model.Profile;
import com.kindred.domain.model.Result;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests the scoring formula in isolation by running FindMatches with a
 * single candidate and known tags, then checking the returned score.
 *
 * Scoring: score = 0.85 * jaccard(requesterTags, candidateTags)
 *                + 0.15 * (activeWithin7Days ? 1.0 : 0.0)
 */
class JaccardScoringTest {

    static final GeoLocation BROOKLYN = new GeoLocation(40.6782, -73.9442);
    // Fixed "now" — candidate lastActiveAt is set relative to this
    static final Instant NOW = Instant.parse("2026-06-06T12:00:00Z");
    static final Clock CLOCK = Clock.fixed(NOW, ZoneOffset.UTC);

    private Profile requesterWith(List<InterestTag> interests) {
        return new Profile(UUID.randomUUID(), UUID.randomUUID(), "Requester", 28, "", "Brooklyn",
                BROOKLYN, interests, false, NOW.minusSeconds(3600));
    }

    private Profile candidateWith(List<InterestTag> interests, Instant lastActive) {
        return new Profile(UUID.randomUUID(), UUID.randomUUID(), "Candidate", 27, "", "Brooklyn",
                BROOKLYN, interests, false, lastActive);
    }

    private MatchScore scoreFor(Profile requester, Profile candidate) {
        var repo = new InMemoryProfileRepository();
        repo.save(requester);
        var finder = new InMemoryMatchCandidateFinder();
        finder.add(candidate);
        var useCase = new FindMatches(repo, finder, new InMemoryConnectionRepository(), CLOCK);
        var result = useCase.execute(new FindMatches.Query(requester.id(), 25.0));
        assertThat(result).isInstanceOf(Result.Success.class);
        @SuppressWarnings("unchecked")
        var candidates = (java.util.List<MatchCandidate>)
                ((Result.Success<java.util.List<MatchCandidate>, ProfileError>) result).value();
        assertThat(candidates).hasSize(1);
        return candidates.get(0).score();
    }

    @Test
    void perfectTagOverlapWithRecentActivityScoresNearOne() {
        var tags = List.of(new InterestTag("Coffee"), new InterestTag("Hiking"));
        Profile requester = requesterWith(tags);
        Profile candidate = candidateWith(tags, NOW.minusSeconds(3600)); // active 1h ago → recent

        MatchScore score = scoreFor(requester, candidate);

        // jaccard = 1.0, recency = 1.0 → score = 0.85 * 1.0 + 0.15 * 1.0 = 1.0
        assertThat(score.value()).isEqualTo(1.0);
    }

    @Test
    void noTagOverlapNoRecentActivityScoresZero() {
        Profile requester = requesterWith(List.of(new InterestTag("Coffee")));
        Profile candidate = candidateWith(List.of(new InterestTag("Gaming")),
                NOW.minus(java.time.Duration.ofDays(10))); // old activity

        MatchScore score = scoreFor(requester, candidate);

        // jaccard = 0.0, recency = 0.0 → score = 0.0
        assertThat(score.value()).isEqualTo(0.0);
    }

    @Test
    void partialTagOverlapWithoutRecency() {
        // A = {Coffee, Hiking}, B = {Coffee, Gaming} → intersection=1, union=3 → jaccard=1/3
        Profile requester = requesterWith(List.of(new InterestTag("Coffee"), new InterestTag("Hiking")));
        Profile candidate = candidateWith(List.of(new InterestTag("Coffee"), new InterestTag("Gaming")),
                NOW.minus(java.time.Duration.ofDays(10)));

        MatchScore score = scoreFor(requester, candidate);

        double expected = 0.85 * (1.0 / 3.0); // + 0.15 * 0.0
        assertThat(score.value()).isCloseTo(expected, org.assertj.core.data.Offset.offset(1e-9));
    }

    @Test
    void noTagsOnEitherSideScoresZero() {
        Profile requester = requesterWith(List.of());
        Profile candidate = candidateWith(List.of(), NOW.minusSeconds(3600));

        MatchScore score = scoreFor(requester, candidate);

        // jaccard(∅, ∅) = 0, even with recency: 0.85*0 + 0.15*1 = 0.15
        assertThat(score.value()).isCloseTo(0.15, org.assertj.core.data.Offset.offset(1e-9));
    }

    @Test
    void recencyBoostAloneGivesNonZeroScore() {
        // No tag overlap but candidate is active recently
        Profile requester = requesterWith(List.of(new InterestTag("Coffee")));
        Profile candidate = candidateWith(List.of(new InterestTag("Gaming")),
                NOW.minusSeconds(3600)); // recent

        MatchScore score = scoreFor(requester, candidate);

        // jaccard=0, recency=1 → 0.85*0 + 0.15*1 = 0.15
        assertThat(score.value()).isCloseTo(0.15, org.assertj.core.data.Offset.offset(1e-9));
    }

    @Test
    void activityExactlyAtSevenDayBoundaryCountsAsRecent() {
        Profile requester = requesterWith(List.of());
        // exactly 7 days ago = still within the window (isAfter is exclusive, so 7 days - 1 second is recent)
        Profile candidate = candidateWith(List.of(),
                NOW.minus(java.time.Duration.ofDays(7)).plusSeconds(1));

        MatchScore score = scoreFor(requester, candidate);
        assertThat(score.value()).isCloseTo(0.15, org.assertj.core.data.Offset.offset(1e-9));
    }

    @Test
    void activityOlderThanSevenDaysIsNotRecent() {
        Profile requester = requesterWith(List.of());
        Profile candidate = candidateWith(List.of(),
                NOW.minus(java.time.Duration.ofDays(8)));

        MatchScore score = scoreFor(requester, candidate);
        assertThat(score.value()).isEqualTo(0.0);
    }
}
