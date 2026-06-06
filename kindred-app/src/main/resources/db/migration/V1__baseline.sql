-- Baseline migration. Full schema arrives in T3.
-- This placeholder lets the app boot cleanly against an empty database.
CREATE TABLE IF NOT EXISTS _schema_ready (
    id BOOLEAN PRIMARY KEY DEFAULT TRUE
);
