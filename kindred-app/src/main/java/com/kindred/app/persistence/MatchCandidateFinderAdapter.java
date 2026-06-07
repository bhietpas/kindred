package com.kindred.app.persistence;

import com.kindred.domain.model.GeoLocation;
import com.kindred.domain.model.InterestTag;
import com.kindred.domain.model.Profile;
import com.kindred.domain.port.MatchCandidateFinder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.Array;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Component
public class MatchCandidateFinderAdapter implements MatchCandidateFinder {

    private static final double METERS_PER_MILE = 1_609.344;

    private final JdbcTemplate jdbc;

    public MatchCandidateFinderAdapter(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public List<Profile> findWithinRadius(GeoLocation origin, double radiusMiles) {
        double radiusMeters = radiusMiles * METERS_PER_MILE;

        return jdbc.query("""
                SELECT p.id, p.user_id, p.name, p.age, p.bio, p.city,
                       p.interests, p.available_to_hang, p.last_active_at,
                       ST_Y(p.location::geometry) AS lat,
                       ST_X(p.location::geometry) AS lon
                FROM profiles p
                WHERE p.location IS NOT NULL
                  AND ST_DWithin(
                        p.location,
                        ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography,
                        ?
                      )
                """,
                (rs, rowNum) -> {
                    Array arr = rs.getArray("interests");
                    String[] rawTags = arr != null ? (String[]) arr.getArray() : new String[0];
                    List<InterestTag> interests = List.of(rawTags).stream()
                            .map(InterestTag::new).toList();

                    GeoLocation location = new GeoLocation(
                            rs.getDouble("lat"), rs.getDouble("lon"));

                    return new Profile(
                            rs.getObject("id", UUID.class),
                            rs.getObject("user_id", UUID.class),
                            rs.getString("name"),
                            rs.getInt("age"),
                            rs.getString("bio"),
                            rs.getString("city"),
                            location,
                            interests,
                            rs.getBoolean("available_to_hang"),
                            rs.getTimestamp("last_active_at").toInstant());
                },
                origin.longitude(), origin.latitude(), radiusMeters);
    }
}
