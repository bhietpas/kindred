package com.kindred.app.persistence;

import com.kindred.domain.model.Connection;
import com.kindred.domain.port.ConnectionRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class ConnectionRepositoryAdapter implements ConnectionRepository {

    private final ConnectionJpaRepository jpa;

    public ConnectionRepositoryAdapter(ConnectionJpaRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Connection> findInvolvingUser(UUID userId) {
        return jpa.findAllInvolvingUser(userId).stream()
                .map(ConnectionRepositoryAdapter::toDomain)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Connection> findById(UUID id) {
        return jpa.findById(id).map(ConnectionRepositoryAdapter::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsBetween(UUID userIdA, UUID userIdB) {
        return jpa.existsBetweenUsers(userIdA, userIdB);
    }

    @Override
    @Transactional
    public Connection save(Connection connection) {
        ConnectionJpaEntity entity = new ConnectionJpaEntity(
                connection.id(), connection.requesterId(),
                connection.recipientId(), connection.status().name());
        return toDomain(jpa.save(entity));
    }

    private static Connection toDomain(ConnectionJpaEntity e) {
        return new Connection(e.getId(), e.getRequesterId(), e.getRecipientId(),
                Connection.Status.valueOf(e.getStatus()));
    }
}
