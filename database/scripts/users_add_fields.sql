-- Add gender and height to users
ALTER TABLE users
  ADD COLUMN height_in INT NOT NULL DEFAULT 0,
  ADD COLUMN is_male TINYINT(1) NOT NULL DEFAULT 0;
