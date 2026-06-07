package com.kindred.domain.usecase;

import com.kindred.domain.error.ProfileError;
import com.kindred.domain.model.Connection;
import com.kindred.domain.model.GeoLocation;
import com.kindred.domain.model.InterestTag;
import com.kindred.domain.model.MatchCandidate;
import com.kindred.domain.model.Profile;
import com.kindred.domain.model.Result;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class FindMatchesTest {

    static final GeoLocation BROOKLYN = new GeoLocation(40.6782, -73.9442);
    static final Instant NOW = Instant.parse("2026-06-06T12:00:00Z");
    static final Clock CLOCK = Clock.fixed(NOW, ZoneOffset.UTC);
    static final Instant RECENTLY = NOW.minusSeconds(3600);        // 1 hour ago — within 7 days
    static final Instant LONG_AGO = NOW.minus(java.time.Duration.ofDays(30)); // 30 days ago

    // Fixed user IDs for the requester and candidates
    final UUID requesterUserId  = UUID.fromString("00000000-0000-0000-0000-000000000001");
    final UUID candidateAUserId = UUID.fromString("00000000-0000-0000-0000-000000000002");
    final UUID candidateBUserId = UUID.fromString("00000000-0000-0000-0000-000000000003");
    final UUID candidateCUserId = UUID.fromString("00000000-0000-0000-0000-000000000004");

    InMemoryProfileRepository profiles;
    InMemoryMatchCandidateFinder finder;
    InMemoryConnectionRepository connections;
    FindMatches useCase;

    Profile requester;

    @BeforeEach
    void setUp() {
        profiles    = new InMemoryProfileRepository();
        finder      = new InMemoryMatchCandidateFinder();
        connections = new InMemoryConnectionRepository();
        useCase     = new FindMatches(profiles, finder, connections, CLOCK);

        requester = profile(requesterUserId, "Requester",
                List.of(new InterestTag("Coffee"), new InterestTag("Hiking")), RECENTLY);
        profiles.save(requester);
    }

    // ── Happy path ────────────────────────────────────────────────────────

    @Test
    void returnsMatchCandidatesSortedByScoreDescending() {
        // Candidate A: shares Coffee only → lower score
        Profile a = profile(candidateAUserId, "A", List.of(new InterestTag("Coffee")), LONG_AGO);
        // Candidate B: shares Coffee + Hiking, recently active → higher score
        Profile b = profile(candidateBUserId, "B",
                List.of(new InterestTag("Coffee"), new InterestTag("Hiking")), RECENTLY);
        finder.add(a);
        finder.add(b);

        List<MatchCandidate> result = successOf(useCase.execute(query()));

        assertThat(result).hasSize(2);
        assertThat(result.get(0).profile().name()).isEqualTo("B"); // higher score first
        assertThat(result.get(1).profile().name()).isEqualTo("A");
    }

    @Test
    void returnsEmptyListWhenNoCandidatesNearby() {
        List<MatchCandidate> result = successOf(useCase.execute(query()));
        assertThat(result).isEmpty();
    }

    // ── Self-exclusion ────────────────────────────────────────────────────

    @Test
    void excludesRequestingUserFromOwnResults() {
        finder.add(requester); // requester appears in geo results

        List<MatchCandidate> result = successOf(useCase.execute(query()));

        assertThat(result).isEmpty();
    }

    // ── Connection exclusion ──────────────────────────────────────────────

    @Test
    void excludesAlreadyAcceptedConnections() {
        Profile accepted = profile(candidateAUserId, "Accepted",
                List.of(new InterestTag("Coffee")), RECENTLY);
        finder.add(accepted);
        connections.add(connection(requesterUserId, candidateAUserId, Connection.Status.ACCEPTED));

        List<MatchCandidate> result = successOf(useCase.execute(query()));

        assertThat(result).isEmpty();
    }

    @Test
    void excludesDeclinedConnectionsWhereRequesterWasInitiator() {
        Profile declined = profile(candidateAUserId, "Declined",
                List.of(new InterestTag("Coffee")), RECENTLY);
        finder.add(declined);
        connections.add(connection(requesterUserId, candidateAUserId, Connection.Status.DECLINED));

        assertThat(successOf(useCase.execute(query()))).isEmpty();
    }

    @Test
    void excludesDeclinedConnectionsWhereRequesterWasRecipient() {
        Profile declined = profile(candidateAUserId, "Declined",
                List.of(new InterestTag("Coffee")), RECENTLY);
        finder.add(declined);
        // They declined US
        connections.add(connection(candidateAUserId, requesterUserId, Connection.Status.DECLINED));

        assertThat(successOf(useCase.execute(query()))).isEmpty();
    }

    @Test
    void doesNotExcludePendingConnections() {
        Profile pending = profile(candidateAUserId, "Pending",
                List.of(new InterestTag("Coffee")), RECENTLY);
        finder.add(pending);
        connections.add(connection(requesterUserId, candidateAUserId, Connection.Status.PENDING));

        // PENDING → still appears in matches
        assertThat(successOf(useCase.execute(query()))).hasSize(1);
    }

    // ── Error cases ───────────────────────────────────────────────────────

    @Test
    void returnsNotFoundWhenRequestingProfileDoesNotExist() {
        Result<List<MatchCandidate>, ProfileError> result =
                useCase.execute(new FindMatches.Query(UUID.randomUUID(), 25.0));

        assertThat(result).isInstanceOf(Result.Failure.class);
        assertThat(((Result.Failure<?, ProfileError>) result).error())
                .isInstanceOf(ProfileError.NotFound.class);
    }

    @Test
    void returnsEmptyWhenRequestingProfileHasNoLocation() {
        Profile noLocation = new Profile(UUID.randomUUID(), requesterUserId,
                "NoLoc", 28, "", "Brooklyn", null,
                List.of(new InterestTag("Coffee")), false, RECENTLY);
        profiles.save(noLocation);

        List<MatchCandidate> result = successOf(
                useCase.execute(new FindMatches.Query(noLocation.id(), 25.0)));

        assertThat(result).isEmpty();
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    private FindMatches.Query query() {
        return new FindMatches.Query(requester.id(), 25.0);
    }

    @SuppressWarnings("unchecked")
    private static List<MatchCandidate> successOf(Result<List<MatchCandidate>, ProfileError> r) {
        assertThat(r).isInstanceOf(Result.Success.class);
        return ((Result.Success<List<MatchCandidate>, ProfileError>) r).value();
    }

    private static Profile profile(UUID userId, String name, List<InterestTag> interests, Instant lastActive) {
        return new Profile(UUID.randomUUID(), userId, name, 28, "", "Brooklyn",
                BROOKLYN, interests, false, lastActive);
    }

    private static Connection connection(UUID requesterId, UUID recipientId, Connection.Status status) {
        return new Connection(UUID.randomUUID(), requesterId, recipientId, status);
    }
}
