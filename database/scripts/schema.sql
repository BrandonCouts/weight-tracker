-- Schema for weight tracker database

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  height_in INT NOT NULL DEFAULT 0,
  is_male TINYINT(1) NOT NULL DEFAULT 0,
  calories_to_cut INT NOT NULL DEFAULT 0,
  role VARCHAR(10) NOT NULL DEFAULT 'user',
  theme VARCHAR(5) NOT NULL DEFAULT 'light',
  units VARCHAR(10) NOT NULL DEFAULT 'scientific',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Weights table
CREATE TABLE IF NOT EXISTS weights (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  value DECIMAL(5,2) NOT NULL,
  recorded_at DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
