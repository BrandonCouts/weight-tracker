-- Add role column to users
ALTER TABLE users
  ADD COLUMN role VARCHAR(10) NOT NULL DEFAULT 'user';
