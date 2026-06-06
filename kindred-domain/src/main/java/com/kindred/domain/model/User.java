package com.kindred.domain.model;

import java.util.UUID;

/**
 * Authenticated user identity. {@code authId} is the opaque subject from the
 * external auth provider (Clerk JWT sub). The domain never calls the auth
 * provider directly — that stays in the app layer.
 */
public record User(UUID id, String authId) {
}
