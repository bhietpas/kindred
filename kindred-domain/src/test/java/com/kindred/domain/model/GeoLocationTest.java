package com.kindred.domain.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class GeoLocationTest {

    @Test
    void acceptsValidCoordinates() {
        GeoLocation loc = new GeoLocation(40.6782, -73.9442); // Brooklyn, NY
        assertThat(loc.latitude()).isEqualTo(40.6782);
        assertThat(loc.longitude()).isEqualTo(-73.9442);
    }

    @Test
    void acceptsBoundaryLatitudes() {
        assertThat(new GeoLocation(90.0, 0.0).latitude()).isEqualTo(90.0);
        assertThat(new GeoLocation(-90.0, 0.0).latitude()).isEqualTo(-90.0);
    }

    @Test
    void acceptsBoundaryLongitudes() {
        assertThat(new GeoLocation(0.0, 180.0).longitude()).isEqualTo(180.0);
        assertThat(new GeoLocation(0.0, -180.0).longitude()).isEqualTo(-180.0);
    }

    @Test
    void rejectsLatitudeTooHigh() {
        assertThatThrownBy(() -> new GeoLocation(90.0001, 0.0))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("latitude");
    }

    @Test
    void rejectsLatitudeTooLow() {
        assertThatThrownBy(() -> new GeoLocation(-90.0001, 0.0))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("latitude");
    }

    @Test
    void rejectsLongitudeTooHigh() {
        assertThatThrownBy(() -> new GeoLocation(0.0, 180.0001))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("longitude");
    }

    @Test
    void rejectsLongitudeTooLow() {
        assertThatThrownBy(() -> new GeoLocation(0.0, -180.0001))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("longitude");
    }
}
