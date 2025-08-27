const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { logError } = require('../logger');

exports.register = async (req, res) => {
  const { username, password, height_in, is_male, calories_to_cut = 0, role = 'user' } = req.body;
  if (!username || !password || height_in == null || is_male == null) {
    return res.status(400).json({ error: 'Username, password, height, and gender required' });
  }
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const roleValue = role === 'admin' ? 'admin' : 'user';
    const [result] = await db.execute(
      'INSERT INTO users (username, password_hash, height_in, is_male, calories_to_cut, role) VALUES (?, ?, ?, ?, ?, ?)',
      [username, passwordHash, height_in, is_male, calories_to_cut, roleValue]
    );
    res.status(201).json({ id: result.insertId, username });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Username already exists' });
    }
    logError(err);
    res.sendStatus(500);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  try {
    const [rows] = await db.execute(
      'SELECT id, password_hash, role FROM users WHERE username = ?',
      [username]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    logError(err);
    res.sendStatus(500);
  }
};
