package com.kindred.domain.usecase;

import com.kindred.domain.model.Connection;
import com.kindred.domain.port.ConnectionRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

class InMemoryConnectionRepository implements ConnectionRepository {

    private final List<Connection> store = new ArrayList<>();

    void add(Connection connection) {
        store.add(connection);
    }

    @Override
    public List<Connection> findInvolvingUser(UUID userId) {
        return store.stream()
                .filter(c -> c.requesterId().equals(userId) || c.recipientId().equals(userId))
                .toList();
    }

    @Override
    public Optional<Connection> findById(UUID id) {
        return store.stream().filter(c -> c.id().equals(id)).findFirst();
    }

    @Override
    public boolean existsBetween(UUID userIdA, UUID userIdB) {
        return store.stream().anyMatch(c ->
                (c.requesterId().equals(userIdA) && c.recipientId().equals(userIdB)) ||
                (c.requesterId().equals(userIdB) && c.recipientId().equals(userIdA)));
    }

    @Override
    public Connection save(Connection connection) {
        // Replace existing by id, or add
        store.removeIf(c -> c.id().equals(connection.id()));
        store.add(connection);
        return connection;
    }
}
