CREATE TABLE users (
    id      UUID         PRIMARY KEY,
    auth_id VARCHAR(255) NOT NULL UNIQUE  -- opaque subject from Clerk JWT
);
