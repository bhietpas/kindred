package com.kindred.domain.usecase;

import com.kindred.domain.model.InterestTag;
import com.kindred.domain.model.MatchScore;
import com.kindred.domain.model.Profile;

import java.time.Duration;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Pure scoring logic — no I/O, no framework.
 *
 * Final score = 0.85 × jaccard(requesterTags, candidateTags)
 *             + 0.15 × (candidateActiveWithin7Days ? 1.0 : 0.0)
 *
 * Both components are in [0, 1] so the result is always in [0, 1].
 */
class MatchScorer {

    private static final double JACCARD_WEIGHT = 0.85;
    private static final double RECENCY_WEIGHT = 0.15;
    private static final Duration RECENCY_WINDOW = Duration.ofDays(7);

    private MatchScorer() {}

    static MatchScore score(Profile candidate, Set<String> requesterTags, Instant now) {
        double jaccard = jaccard(requesterTags, tagSet(candidate));
        double recency = isRecent(candidate.lastActiveAt(), now) ? 1.0 : 0.0;
        return new MatchScore(JACCARD_WEIGHT * jaccard + RECENCY_WEIGHT * recency);
    }

    /** |A ∩ B| / |A ∪ B|, or 0.0 when both sets are empty. */
    private static double jaccard(Set<String> a, Set<String> b) {
        if (a.isEmpty() && b.isEmpty()) return 0.0;
        long intersection = a.stream().filter(b::contains).count();
        long union = Stream.concat(a.stream(), b.stream()).distinct().count();
        return (double) intersection / union;
    }

    private static Set<String> tagSet(Profile p) {
        return p.interests().stream().map(InterestTag::value).collect(Collectors.toSet());
    }

    private static boolean isRecent(Instant lastActive, Instant now) {
        return lastActive.isAfter(now.minus(RECENCY_WINDOW));
    }
}
