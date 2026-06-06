CREATE EXTENSION IF NOT EXISTS postgis;

ALTER TABLE profiles
    ADD COLUMN location GEOGRAPHY(POINT, 4326);

-- GIST index for fast radius queries (ST_DWithin)
CREATE INDEX profiles_location_idx ON profiles USING GIST (location);
