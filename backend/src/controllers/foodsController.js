const db = require('../db');

exports.list = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, name, calories, consumed_at FROM foods WHERE user_id = ? ORDER BY consumed_at DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.create = async (req, res) => {
  const { name, calories } = req.body;
  if (!name || !calories) {
    return res.status(400).json({ error: 'Name and calories required' });
  }
  const date = new Date().toISOString().split('T')[0];
  try {
    const [result] = await db.execute(
      'INSERT INTO foods (user_id, name, calories, consumed_at) VALUES (?, ?, ?, ?)',
      [req.user.id, name, calories, date]
    );
    res.status(201).json({ id: result.insertId, name, calories, consumed_at: date });
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  const { name, calories } = req.body;
  if (!name && !calories) {
    return res.status(400).json({ error: 'Nothing to update' });
  }
  const fields = [];
  const params = [];
  if (name) {
    fields.push('name = ?');
    params.push(name);
  }
  if (calories) {
    fields.push('calories = ?');
    params.push(calories);
  }
  params.push(req.params.id, req.user.id);
  try {
    const [result] = await db.execute(
      `UPDATE foods SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      params
    );
    if (result.affectedRows === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.remove = async (req, res) => {
  try {
    const [result] = await db.execute(
      'DELETE FROM foods WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};
