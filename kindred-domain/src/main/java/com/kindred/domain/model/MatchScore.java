package com.kindred.domain.model;

/**
 * A normalized match score in [0.0, 1.0]. Higher is a better match.
 */
public record MatchScore(double value) {

    public MatchScore {
        if (value < 0.0 || value > 1.0) {
            throw new IllegalArgumentException(
                    "score must be between 0.0 and 1.0, got: " + value);
        }
    }
}
