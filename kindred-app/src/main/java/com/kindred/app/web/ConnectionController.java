package com.kindred.app.web;

import com.kindred.app.persistence.UserLookup;
import com.kindred.app.security.CurrentUser;
import com.kindred.domain.error.ConnectionError;
import com.kindred.domain.model.Connection;
import com.kindred.domain.model.Profile;
import com.kindred.domain.port.ProfileRepository;
import com.kindred.domain.model.Result;
import com.kindred.domain.usecase.ListConnections;
import com.kindred.domain.usecase.RequestConnection;
import com.kindred.domain.usecase.RespondToConnection;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/connections")
class ConnectionController {

    /** POST body — only the recipient's profile ID; requester comes from auth. */
    record CreateConnectionRequest(UUID recipientProfileId) {}

    /** PATCH body — only the new status; responder identity comes from auth. */
    record UpdateConnectionRequest(String status) {}

    private final RequestConnection requestConnection;
    private final RespondToConnection respondToConnection;
    private final ListConnections listConnections;
    private final ProfileRepository profiles;
    private final UserLookup userLookup;

    ConnectionController(RequestConnection requestConnection, RespondToConnection respondToConnection,
                         ListConnections listConnections, ProfileRepository profiles, UserLookup userLookup) {
        this.requestConnection   = requestConnection;
        this.respondToConnection = respondToConnection;
        this.listConnections     = listConnections;
        this.profiles            = profiles;
        this.userLookup          = userLookup;
    }

    /** GET /api/v1/connections — list connections for the authenticated user. */
    @GetMapping
    ResponseEntity<?> list(@AuthenticationPrincipal CurrentUser currentUser,
                            @RequestParam(required = false) String status) {
        Optional<Connection.Status> statusFilter;
        if (status != null) {
            try {
                statusFilter = Optional.of(Connection.Status.valueOf(status));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("INVALID_STATUS", "Unknown status: " + status));
            }
        } else {
            statusFilter = Optional.empty();
        }

        Optional<UUID> userId = userLookup.findUserId(currentUser.clerkId());
        if (userId.isEmpty()) {
            return ResponseEntity.ok(List.of());
        }

        List<ConnectionResponse> result = listConnections
                .execute(new ListConnections.Query(userId.get(), statusFilter))
                .stream()
                .map(ConnectionResponse::from)
                .toList();

        return ResponseEntity.ok(result);
    }

    /** POST /api/v1/connections — request a friendship connection. */
    @PostMapping
    ResponseEntity<?> request(@AuthenticationPrincipal CurrentUser currentUser,
                               @RequestBody CreateConnectionRequest body) {
        Optional<Profile> requesterProfile = userLookup.findUserId(currentUser.clerkId())
                .flatMap(profiles::findByUserId);

        if (requesterProfile.isEmpty()) {
            return ResponseEntity.status(404).body(new ErrorResponse("NOT_FOUND",
                    "No profile found for authenticated user"));
        }

        var cmd = new RequestConnection.Command(requesterProfile.get().id(), body.recipientProfileId());
        return switch (requestConnection.execute(cmd)) {
            case Result.Success<Connection, ConnectionError> s -> {
                ConnectionResponse resp = ConnectionResponse.from(s.value());
                yield ResponseEntity.created(URI.create("/api/v1/connections/" + resp.id())).body(resp);
            }
            case Result.Failure<Connection, ConnectionError> f -> toErrorResponse(f.error());
        };
    }

    /** PATCH /api/v1/connections/{id} — accept or decline a pending connection. */
    @PatchMapping("/{id}")
    ResponseEntity<?> respond(@AuthenticationPrincipal CurrentUser currentUser,
                               @PathVariable UUID id,
                               @RequestBody UpdateConnectionRequest body) {
        Connection.Status response;
        try {
            response = Connection.Status.valueOf(body.status());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("INVALID_STATUS", "Unknown status: " + body.status()));
        }

        Optional<Profile> responderProfile = userLookup.findUserId(currentUser.clerkId())
                .flatMap(profiles::findByUserId);

        if (responderProfile.isEmpty()) {
            return ResponseEntity.status(404).body(new ErrorResponse("NOT_FOUND",
                    "No profile found for authenticated user"));
        }

        var cmd = new RespondToConnection.Command(id, responderProfile.get().id(), response);
        return switch (respondToConnection.execute(cmd)) {
            case Result.Success<Connection, ConnectionError> s ->
                    ResponseEntity.ok(ConnectionResponse.from(s.value()));
            case Result.Failure<Connection, ConnectionError> f -> toErrorResponse(f.error());
        };
    }

    private ResponseEntity<ErrorResponse> toErrorResponse(ConnectionError error) {
        return switch (error) {
            case ConnectionError.NotFound e ->
                    ResponseEntity.status(404).body(new ErrorResponse("NOT_FOUND",
                            "Connection not found: " + e.connectionId()));
            case ConnectionError.ProfileNotFound e ->
                    ResponseEntity.status(404).body(new ErrorResponse("NOT_FOUND",
                            "Profile not found: " + e.profileId()));
            case ConnectionError.AlreadyExists e ->
                    ResponseEntity.status(409).body(new ErrorResponse("ALREADY_EXISTS",
                            "A connection already exists between these users"));
            case ConnectionError.InvalidTransition e ->
                    ResponseEntity.status(409).body(new ErrorResponse("INVALID_TRANSITION",
                            "Cannot transition from " + e.from() + " to " + e.to()));
            case ConnectionError.NotRecipient e ->
                    ResponseEntity.status(403).body(new ErrorResponse("NOT_RECIPIENT",
                            "Only the recipient may respond to connection: " + e.connectionId()));
        };
    }
}
