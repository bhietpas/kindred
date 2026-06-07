package com.kindred.app.security;

/**
 * Represents the authenticated caller. Populated by {@link JwtToCurrentUserConverter}
 * from the validated Clerk JWT and injected into controllers via
 * {@code @AuthenticationPrincipal CurrentUser}.
 *
 * Lives in the app layer only — the domain is never aware of Clerk or auth.
 */
public record CurrentUser(String clerkId) {}
