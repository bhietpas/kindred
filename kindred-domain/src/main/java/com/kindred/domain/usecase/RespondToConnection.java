package com.kindred.domain.usecase;

import com.kindred.domain.error.ConnectionError;
import com.kindred.domain.model.Connection;
import com.kindred.domain.model.Profile;
import com.kindred.domain.model.Result;
import com.kindred.domain.port.ConnectionRepository;
import com.kindred.domain.port.ProfileRepository;

import java.util.UUID;

/**
 * Use case: the recipient of a pending connection accepts or declines it.
 * Only the recipient may respond; only PENDING connections may be transitioned.
 * Valid responses are ACCEPTED and DECLINED — responding with PENDING is an error.
 */
public class RespondToConnection {

    public record Command(UUID connectionId, UUID responderProfileId, Connection.Status response) {}

    private final ProfileRepository profiles;
    private final ConnectionRepository connections;

    public RespondToConnection(ProfileRepository profiles, ConnectionRepository connections) {
        this.profiles    = profiles;
        this.connections = connections;
    }

    public Result<Connection, ConnectionError> execute(Command cmd) {
        var maybeConnection = connections.findById(cmd.connectionId());
        if (maybeConnection.isEmpty()) {
            return Result.failure(new ConnectionError.NotFound(cmd.connectionId()));
        }
        Connection connection = maybeConnection.get();

        if (connection.status() != Connection.Status.PENDING) {
            return Result.failure(new ConnectionError.InvalidTransition(connection.status(), cmd.response()));
        }

        if (cmd.response() == Connection.Status.PENDING) {
            return Result.failure(new ConnectionError.InvalidTransition(connection.status(), cmd.response()));
        }

        var maybeResponder = profiles.findById(cmd.responderProfileId());
        if (maybeResponder.isEmpty()) {
            return Result.failure(new ConnectionError.ProfileNotFound(cmd.responderProfileId()));
        }
        Profile responder = maybeResponder.get();

        if (!responder.userId().equals(connection.recipientId())) {
            return Result.failure(new ConnectionError.NotRecipient(cmd.connectionId()));
        }

        Connection updated = new Connection(
                connection.id(), connection.requesterId(), connection.recipientId(), cmd.response());
        return Result.success(connections.save(updated));
    }
}
