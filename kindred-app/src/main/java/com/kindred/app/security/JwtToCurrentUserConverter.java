package com.kindred.app.security;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Converts a validated Clerk JWT into a Spring {@link AbstractAuthenticationToken} whose
 * principal is a {@link CurrentUser}. The {@code sub} claim holds the Clerk user ID.
 */
@Component
public class JwtToCurrentUserConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    @Override
    public AbstractAuthenticationToken convert(Jwt source) {
        String clerkId = source.getSubject();
        return new UsernamePasswordAuthenticationToken(
                new CurrentUser(clerkId), source, List.of());
    }
}
