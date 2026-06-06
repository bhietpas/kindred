package com.kindred.domain.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class InterestTagTest {

    @Test
    void acceptsValidTag() {
        InterestTag tag = new InterestTag("Coffee");
        assertThat(tag.value()).isEqualTo("Coffee");
    }

    @Test
    void rejectsNullValue() {
        assertThatThrownBy(() -> new InterestTag(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("tag");
    }

    @Test
    void rejectsBlankValue() {
        assertThatThrownBy(() -> new InterestTag("   "))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("tag");
    }

    @Test
    void rejectsEmptyValue() {
        assertThatThrownBy(() -> new InterestTag(""))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("tag");
    }
}
