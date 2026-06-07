package com.kindred.app.persistence;

import com.kindred.domain.model.GeoLocation;
import com.kindred.domain.model.InterestTag;
import com.kindred.domain.model.Profile;
import com.kindred.domain.port.ProfileRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class ProfileRepositoryAdapter implements ProfileRepository {

    private final ProfileJpaRepository jpa;
    private final JdbcTemplate jdbc;

    public ProfileRepositoryAdapter(ProfileJpaRepository jpa, JdbcTemplate jdbc) {
        this.jpa = jpa;
        this.jdbc = jdbc;
    }

    @Override
    @Transactional
    public Profile save(Profile profile) {
        ProfileJpaEntity entity = toEntity(profile);
        jpa.save(entity);

        if (profile.location() != null) {
            jdbc.update(
                    "UPDATE profiles SET location = ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography WHERE id = ?",
                    profile.location().longitude(),
                    profile.location().latitude(),
                    profile.id());
        }

        return toDomain(entity, profile.location());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Profile> findById(UUID id) {
        return jpa.findById(id).map(entity -> toDomain(entity, queryLocation(id)));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Profile> findByUserId(UUID userId) {
        return jpa.findByUserId(userId).map(entity -> toDomain(entity, queryLocation(entity.getId())));
    }

    // ── Mapping ───────────────────────────────────────────────────────────

    private static ProfileJpaEntity toEntity(Profile p) {
        String[] interests = p.interests().stream()
                .map(InterestTag::value)
                .toArray(String[]::new);
        return new ProfileJpaEntity(
                p.id(), p.userId(), p.name(), p.age(), p.bio(),
                p.city(), interests, p.availableToHang(), p.lastActiveAt());
    }

    private static Profile toDomain(ProfileJpaEntity e, GeoLocation location) {
        List<InterestTag> interests = e.getInterests() == null
                ? List.of()
                : Arrays.stream(e.getInterests()).map(InterestTag::new).toList();
        return new Profile(
                e.getId(), e.getUserId(), e.getName(), e.getAge(), e.getBio(),
                e.getCity(), location, interests, e.isAvailableToHang(), e.getLastActiveAt());
    }

    // ── PostGIS location ──────────────────────────────────────────────────

    private GeoLocation queryLocation(UUID id) {
        return jdbc.query(
                "SELECT ST_Y(location::geometry) AS lat, ST_X(location::geometry) AS lon " +
                "FROM profiles WHERE id = ? AND location IS NOT NULL",
                rs -> rs.next()
                        ? new GeoLocation(rs.getDouble("lat"), rs.getDouble("lon"))
                        : null,
                id);
    }
}
