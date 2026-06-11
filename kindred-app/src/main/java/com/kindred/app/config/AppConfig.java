package com.kindred.app.config;

import com.kindred.domain.port.ConnectionRepository;
import com.kindred.domain.port.MatchCandidateFinder;
import com.kindred.domain.port.ProfileRepository;
import com.kindred.domain.usecase.CreateProfile;
import com.kindred.domain.usecase.FetchProfile;
import com.kindred.domain.usecase.FindMatches;
import com.kindred.domain.usecase.ListConnections;
import com.kindred.domain.usecase.RequestConnection;
import com.kindred.domain.usecase.RespondToConnection;
import com.kindred.domain.usecase.UpdateProfile;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Clock;

@Configuration
class AppConfig {

    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }

    @Bean
    CreateProfile createProfile(ProfileRepository profiles, Clock clock) {
        return new CreateProfile(profiles, clock);
    }

    @Bean
    FetchProfile fetchProfile(ProfileRepository profiles) {
        return new FetchProfile(profiles);
    }

    @Bean
    UpdateProfile updateProfile(ProfileRepository profiles, Clock clock) {
        return new UpdateProfile(profiles, clock);
    }

    @Bean
    FindMatches findMatches(ProfileRepository profiles, MatchCandidateFinder finder,
                            ConnectionRepository connections, Clock clock) {
        return new FindMatches(profiles, finder, connections, clock);
    }

    @Bean
    RequestConnection requestConnection(ProfileRepository profiles, ConnectionRepository connections) {
        return new RequestConnection(profiles, connections);
    }

    @Bean
    RespondToConnection respondToConnection(ProfileRepository profiles, ConnectionRepository connections) {
        return new RespondToConnection(profiles, connections);
    }

    @Bean
    ListConnections listConnections(ConnectionRepository connections) {
        return new ListConnections(connections);
    }
}
