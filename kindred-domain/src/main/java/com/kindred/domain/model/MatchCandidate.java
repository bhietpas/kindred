package com.kindred.domain.model;

/**
 * A profile surfaced by the matching engine, together with its computed score.
 * Sorted descending by score before being returned to the caller.
 */
public record MatchCandidate(Profile profile, MatchScore score) implements Comparable<MatchCandidate> {

    @Override
    public int compareTo(MatchCandidate other) {
        // Higher score sorts first
        return Double.compare(other.score().value(), this.score().value());
    }
}
