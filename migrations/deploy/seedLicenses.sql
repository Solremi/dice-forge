-- Deploy diceforge:seedLicenses to pg

BEGIN;

INSERT INTO "license" (name)
VALUES 
('Donjons et Dragons'), 
('Cthulhu'), 
('Warhammer'),
('Libre');

COMMIT;
