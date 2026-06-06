-- Dev seed: 20 realistic profiles scattered across Brooklyn, NY.
-- Only runs when the "dev" Spring profile is active (application-dev.yml
-- adds classpath:db/seed to flyway.locations). Never runs in prod or CI.

INSERT INTO users (id, auth_id) VALUES
    ('00000001-0000-0000-0000-000000000001', 'clerk|dev_sam'),
    ('00000001-0000-0000-0000-000000000002', 'clerk|dev_jordan'),
    ('00000001-0000-0000-0000-000000000003', 'clerk|dev_casey'),
    ('00000001-0000-0000-0000-000000000004', 'clerk|dev_alex'),
    ('00000001-0000-0000-0000-000000000005', 'clerk|dev_morgan'),
    ('00000001-0000-0000-0000-000000000006', 'clerk|dev_riley'),
    ('00000001-0000-0000-0000-000000000007', 'clerk|dev_avery'),
    ('00000001-0000-0000-0000-000000000008', 'clerk|dev_quinn'),
    ('00000001-0000-0000-0000-000000000009', 'clerk|dev_drew'),
    ('00000001-0000-0000-0000-000000000010', 'clerk|dev_sage'),
    ('00000001-0000-0000-0000-000000000011', 'clerk|dev_blake'),
    ('00000001-0000-0000-0000-000000000012', 'clerk|dev_charlie'),
    ('00000001-0000-0000-0000-000000000013', 'clerk|dev_dakota'),
    ('00000001-0000-0000-0000-000000000014', 'clerk|dev_finley'),
    ('00000001-0000-0000-0000-000000000015', 'clerk|dev_hayden'),
    ('00000001-0000-0000-0000-000000000016', 'clerk|dev_jessie'),
    ('00000001-0000-0000-0000-000000000017', 'clerk|dev_kai'),
    ('00000001-0000-0000-0000-000000000018', 'clerk|dev_lane'),
    ('00000001-0000-0000-0000-000000000019', 'clerk|dev_micah'),
    ('00000001-0000-0000-0000-000000000020', 'clerk|dev_noah');

-- Profiles with locations spread across Brooklyn neighborhoods.
-- ST_MakePoint(longitude, latitude) — note the order.
INSERT INTO profiles (id, user_id, name, age, bio, city, interests, available_to_hang, last_active_at, location) VALUES
    ('00000002-0000-0000-0000-000000000001', '00000001-0000-0000-0000-000000000001',
     'Sam', 28, 'Always hunting the best pour-over and a good trail to recover after.',
     'Carroll Gardens', '{"Coffee","Hiking","Photography"}', true, NOW() - INTERVAL '1 hour',
     ST_SetSRID(ST_MakePoint(-73.9954, 40.6799), 4326)::geography),

    ('00000002-0000-0000-0000-000000000002', '00000001-0000-0000-0000-000000000002',
     'Jordan', 26, 'Prospect Park is my backyard. Trail runs, sunrise hikes, the works.',
     'Prospect Heights', '{"Hiking","Running","Outdoors"}', true, NOW() - INTERVAL '2 hours',
     ST_SetSRID(ST_MakePoint(-73.9655, 40.6736), 4326)::geography),

    ('00000002-0000-0000-0000-000000000003', '00000001-0000-0000-0000-000000000003',
     'Casey', 31, 'Board game collector. Wingspan enthusiast. Catan diplomat.',
     'Bushwick', '{"Board games","Gaming","Strategy"}', false, NOW() - INTERVAL '3 hours',
     ST_SetSRID(ST_MakePoint(-73.9208, 40.6944), 4326)::geography),

    ('00000002-0000-0000-0000-000000000004', '00000001-0000-0000-0000-000000000004',
     'Alex', 29, 'Third-wave coffee or bust. I know every roastery within 20 blocks.',
     'Williamsburg', '{"Coffee","Cafes","Food"}', true, NOW() - INTERVAL '30 minutes',
     ST_SetSRID(ST_MakePoint(-73.9577, 40.7081), 4326)::geography),

    ('00000002-0000-0000-0000-000000000005', '00000001-0000-0000-0000-000000000005',
     'Morgan', 27, 'Jazz listener, vinyl collector, late-night noodles enthusiast.',
     'East Williamsburg', '{"Jazz","Music","Vinyl","Food"}', true, NOW() - INTERVAL '5 hours',
     ST_SetSRID(ST_MakePoint(-73.9367, 40.7057), 4326)::geography),

    ('00000002-0000-0000-0000-000000000006', '00000001-0000-0000-0000-000000000006',
     'Riley', 25, 'Indie films, long walks, and cooking elaborate weekend meals.',
     'Park Slope', '{"Indie films","Cooking","Arts"}', false, NOW() - INTERVAL '1 day',
     ST_SetSRID(ST_MakePoint(-73.9798, 40.6681), 4326)::geography),

    ('00000002-0000-0000-0000-000000000007', '00000001-0000-0000-0000-000000000007',
     'Avery', 30, 'Rock climber by weekend, software person by week. Send it.',
     'DUMBO', '{"Climbing","Outdoors","Photography"}', true, NOW() - INTERVAL '45 minutes',
     ST_SetSRID(ST_MakePoint(-73.9882, 40.7033), 4326)::geography),

    ('00000002-0000-0000-0000-000000000008', '00000001-0000-0000-0000-000000000008',
     'Quinn', 33, 'Tabletop RPG forever DM looking for players who actually show up.',
     'Crown Heights', '{"D&D","Gaming","Storytelling"}', false, NOW() - INTERVAL '6 hours',
     ST_SetSRID(ST_MakePoint(-73.9454, 40.6694), 4326)::geography),

    ('00000002-0000-0000-0000-000000000009', '00000001-0000-0000-0000-000000000009',
     'Drew', 28, 'Farmers market devotee. If there are samples, I am there.',
     'Fort Greene', '{"Food","Cooking","Markets"}', true, NOW() - INTERVAL '2 hours',
     ST_SetSRID(ST_MakePoint(-73.9740, 40.6906), 4326)::geography),

    ('00000002-0000-0000-0000-000000000010', '00000001-0000-0000-0000-000000000010',
     'Sage', 27, 'Yoga, matcha, and the occasional bouldering session.',
     'Cobble Hill', '{"Wellness","Yoga","Coffee","Climbing"}', true, NOW() - INTERVAL '20 minutes',
     ST_SetSRID(ST_MakePoint(-73.9959, 40.6868), 4326)::geography),

    ('00000002-0000-0000-0000-000000000011', '00000001-0000-0000-0000-000000000011',
     'Blake', 35, 'Record store regular. Looking for people who have opinions about music.',
     'Greenpoint', '{"Music","Vinyl","Jazz","Indie films"}', false, NOW() - INTERVAL '2 days',
     ST_SetSRID(ST_MakePoint(-73.9496, 40.7297), 4326)::geography),

    ('00000002-0000-0000-0000-000000000012', '00000001-0000-0000-0000-000000000012',
     'Charlie', 24, 'Just moved here from Austin. Learning the subway. Up for anything.',
     'Bed-Stuy', '{"Outdoors","Food","Music"}', true, NOW() - INTERVAL '10 minutes',
     ST_SetSRID(ST_MakePoint(-73.9366, 40.6839), 4326)::geography),

    ('00000002-0000-0000-0000-000000000013', '00000001-0000-0000-0000-000000000013',
     'Dakota', 29, 'Sketch comedy writer who also does bouldering. It is a type.',
     'Ridgewood', '{"Arts","Comedy","Climbing","Gaming"}', false, NOW() - INTERVAL '4 hours',
     ST_SetSRID(ST_MakePoint(-73.9043, 40.7001), 4326)::geography),

    ('00000002-0000-0000-0000-000000000014', '00000001-0000-0000-0000-000000000014',
     'Finley', 31, 'Serious about running, casual about everything else.',
     'Bay Ridge', '{"Running","Outdoors","Wellness"}', true, NOW() - INTERVAL '3 hours',
     ST_SetSRID(ST_MakePoint(-74.0284, 40.6359), 4326)::geography),

    ('00000002-0000-0000-0000-000000000015', '00000001-0000-0000-0000-000000000015',
     'Hayden', 26, 'Art openings, gallery hops, and the free wine that comes with them.',
     'Gowanus', '{"Arts","Music","Food"}', true, NOW() - INTERVAL '1 hour',
     ST_SetSRID(ST_MakePoint(-73.9930, 40.6728), 4326)::geography),

    ('00000002-0000-0000-0000-000000000016', '00000001-0000-0000-0000-000000000016',
     'Jessie', 32, 'Home brewer experimenting with weird fermentation. Very normal hobby.',
     'Sunset Park', '{"Coffee","Food","Cooking","Wellness"}', false, NOW() - INTERVAL '8 hours',
     ST_SetSRID(ST_MakePoint(-74.0060, 40.6460), 4326)::geography),

    ('00000002-0000-0000-0000-000000000017', '00000001-0000-0000-0000-000000000017',
     'Kai', 23, 'Photography student. Will trade portrait session for good recs.',
     'Williamsburg', '{"Photography","Arts","Coffee","Indie films"}', true, NOW() - INTERVAL '15 minutes',
     ST_SetSRID(ST_MakePoint(-73.9523, 40.7143), 4326)::geography),

    ('00000002-0000-0000-0000-000000000018', '00000001-0000-0000-0000-000000000018',
     'Lane', 34, 'Strategy gamer and amateur chef. Dinner + Catan is a valid evening.',
     'Kensington', '{"Board games","Cooking","Gaming","Food"}', false, NOW() - INTERVAL '1 day',
     ST_SetSRID(ST_MakePoint(-73.9750, 40.6441), 4326)::geography),

    ('00000002-0000-0000-0000-000000000019', '00000001-0000-0000-0000-000000000019',
     'Micah', 27, 'Doing every free walking tour I can find. Brooklyn has layers.',
     'Downtown Brooklyn', '{"Outdoors","Arts","Food","Photography"}', true, NOW() - INTERVAL '40 minutes',
     ST_SetSRID(ST_MakePoint(-73.9897, 40.6928), 4326)::geography),

    ('00000002-0000-0000-0000-000000000020', '00000001-0000-0000-0000-000000000020',
     'Noah', 30, 'Live music is my love language. Also good at finding parking somehow.',
     'Flatbush', '{"Music","Jazz","Outdoors","Gaming"}', true, NOW() - INTERVAL '2 hours',
     ST_SetSRID(ST_MakePoint(-73.9595, 40.6501), 4326)::geography);
