-- Add daily calorie cut to users
ALTER TABLE users
  ADD COLUMN calories_to_cut INT NOT NULL DEFAULT 0;
