CREATE TABLE connections (
    id           UUID        PRIMARY KEY,
    requester_id UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_id UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status       VARCHAR(10) NOT NULL CHECK (status IN ('PENDING', 'ACCEPTED', 'DECLINED')),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT connections_no_self_connect CHECK (requester_id != recipient_id),
    -- One row per ordered pair — prevents duplicate requests in the same direction
    CONSTRAINT connections_unique_pair UNIQUE (requester_id, recipient_id)
);

CREATE INDEX connections_recipient_idx ON connections (recipient_id);
