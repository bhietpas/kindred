package com.kindred.domain.model;

/**
 * A discriminated union representing either success or failure.
 * Use case methods return this instead of throwing exceptions for control flow.
 */
public sealed interface Result<V, E> permits Result.Success, Result.Failure {

    record Success<V, E>(V value) implements Result<V, E> {}

    record Failure<V, E>(E error) implements Result<V, E> {}

    static <V, E> Result<V, E> success(V value) {
        return new Success<>(value);
    }

    static <V, E> Result<V, E> failure(E error) {
        return new Failure<>(error);
    }
}
