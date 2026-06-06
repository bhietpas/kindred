package com.kindred.domain.model;

/**
 * Immutable geographic coordinate pair. Both values are validated at construction time
 * so no GeoLocation instance can exist with out-of-range coordinates.
 */
public record GeoLocation(double latitude, double longitude) {

    public GeoLocation {
        if (latitude < -90.0 || latitude > 90.0) {
            throw new IllegalArgumentException(
                    "latitude must be between -90 and 90, got: " + latitude);
        }
        if (longitude < -180.0 || longitude > 180.0) {
            throw new IllegalArgumentException(
                    "longitude must be between -180 and 180, got: " + longitude);
        }
    }
}
