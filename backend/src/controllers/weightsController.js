const db = require('../db');
const { logError } = require('../logger');

exports.list = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, value AS weight, recorded_at AS entry_date FROM weights WHERE user_id = ? ORDER BY recorded_at DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    logError(err);
    res.sendStatus(500);
  }
};

exports.create = async (req, res) => {
  const { weight } = req.body;
  if (!weight) {
    return res.status(400).json({ error: 'Weight required' });
  }
  const date = new Date().toISOString().split('T')[0];
  try {
    const [result] = await db.execute(
      'INSERT INTO weights (user_id, value, recorded_at) VALUES (?, ?, ?)',
      [req.user.id, weight, date]
    );
    res.status(201).json({ id: result.insertId, weight, entry_date: date });
  } catch (err) {
    logError(err);
    res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  const { weight } = req.body;
  if (!weight) {
    return res.status(400).json({ error: 'Weight required' });
  }
  try {
    const [result] = await db.execute(
      'UPDATE weights SET value = ? WHERE id = ? AND user_id = ?',
      [weight, req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (err) {
    logError(err);
    res.sendStatus(500);
  }
};

exports.remove = async (req, res) => {
  try {
    const [result] = await db.execute(
      'DELETE FROM weights WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (err) {
    logError(err);
    res.sendStatus(500);
  }
};
