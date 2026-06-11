package com.kindred.app.web;

import com.kindred.domain.model.MatchCandidate;

public record MatchCandidateResponse(ProfileResponse profile, double score) {

    public static MatchCandidateResponse from(MatchCandidate candidate) {
        return new MatchCandidateResponse(
                ProfileResponse.from(candidate.profile()),
                candidate.score().value());
    }
}
