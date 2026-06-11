package com.kindred.domain.usecase;

import com.kindred.domain.error.ConnectionError;
import com.kindred.domain.model.Connection;
import com.kindred.domain.model.Profile;
import com.kindred.domain.model.Result;
import com.kindred.domain.port.ConnectionRepository;
import com.kindred.domain.port.ProfileRepository;

import java.util.UUID;

/**
 * Use case: a user requests a friendship connection with another user.
 * Creates a PENDING connection between the two profiles' owners.
 * Fails if either profile is unknown, or if any connection already exists between the pair.
 */
public class RequestConnection {

    public record Command(UUID requesterProfileId, UUID recipientProfileId) {}

    private final ProfileRepository profiles;
    private final ConnectionRepository connections;

    public RequestConnection(ProfileRepository profiles, ConnectionRepository connections) {
        this.profiles    = profiles;
        this.connections = connections;
    }

    public Result<Connection, ConnectionError> execute(Command cmd) {
        var maybeRequester = profiles.findById(cmd.requesterProfileId());
        if (maybeRequester.isEmpty()) {
            return Result.failure(new ConnectionError.ProfileNotFound(cmd.requesterProfileId()));
        }

        var maybeRecipient = profiles.findById(cmd.recipientProfileId());
        if (maybeRecipient.isEmpty()) {
            return Result.failure(new ConnectionError.ProfileNotFound(cmd.recipientProfileId()));
        }

        Profile requester = maybeRequester.get();
        Profile recipient = maybeRecipient.get();

        if (connections.existsBetween(requester.userId(), recipient.userId())) {
            return Result.failure(new ConnectionError.AlreadyExists(requester.userId(), recipient.userId()));
        }

        Connection connection = new Connection(
                UUID.randomUUID(), requester.userId(), recipient.userId(), Connection.Status.PENDING);
        return Result.success(connections.save(connection));
    }
}
