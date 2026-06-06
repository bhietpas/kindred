package com.kindred.domain.model;

/**
 * A single interest tag on a profile (e.g. "Coffee", "Hiking").
 * Stored as a trimmed, non-blank string.
 */
public record InterestTag(String value) {

    public InterestTag {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Interest tag must not be blank");
        }
        value = value.trim();
    }
}
