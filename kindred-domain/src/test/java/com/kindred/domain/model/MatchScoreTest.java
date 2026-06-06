package com.kindred.domain.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class MatchScoreTest {

    @Test
    void acceptsZero() {
        assertThat(new MatchScore(0.0).value()).isEqualTo(0.0);
    }

    @Test
    void acceptsOne() {
        assertThat(new MatchScore(1.0).value()).isEqualTo(1.0);
    }

    @Test
    void acceptsMidRange() {
        assertThat(new MatchScore(0.75).value()).isEqualTo(0.75);
    }

    @Test
    void rejectsNegativeScore() {
        assertThatThrownBy(() -> new MatchScore(-0.001))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("score");
    }

    @Test
    void rejectsScoreAboveOne() {
        assertThatThrownBy(() -> new MatchScore(1.001))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("score");
    }
}
