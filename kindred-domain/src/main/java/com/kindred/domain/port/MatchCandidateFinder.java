package com.kindred.domain.port;

import com.kindred.domain.model.GeoLocation;
import com.kindred.domain.model.Profile;

import java.util.List;

/**
 * Port — finds nearby profiles from the data store.
 * Only returns profiles that have a location set.
 * The requesting user's own profile may be included; callers are responsible for self-exclusion.
 *
 * Implemented in the app layer by a PostGIS (ST_DWithin) adapter.
 */
public interface MatchCandidateFinder {

    /**
     * @param origin      the geographic centre of the search
     * @param radiusMiles search radius in miles
     */
    List<Profile> findWithinRadius(GeoLocation origin, double radiusMiles);
}
