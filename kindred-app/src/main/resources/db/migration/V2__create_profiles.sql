CREATE TABLE profiles (
    id                UUID        PRIMARY KEY,
    user_id           UUID        NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    name              VARCHAR(255) NOT NULL,
    age               INT          NOT NULL CHECK (age >= 18 AND age <= 120),
    bio               TEXT,
    city              VARCHAR(255),
    interests         TEXT[]       NOT NULL DEFAULT '{}',
    available_to_hang BOOLEAN      NOT NULL DEFAULT FALSE,
    last_active_at    TIMESTAMPTZ  NOT NULL
);
