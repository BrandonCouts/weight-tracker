const db = require('../db');

exports.get = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT username, height_in, is_male, calories_to_cut FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.sendStatus(404);
    }
    res.json(rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  const { height_in, is_male, calories_to_cut } = req.body;
  if (height_in == null && is_male == null && calories_to_cut == null) {
    return res.status(400).json({ error: 'Nothing to update' });
  }
  const fields = [];
  const params = [];
  if (height_in != null) {
    fields.push('height_in = ?');
    params.push(height_in);
  }
  if (is_male != null) {
    fields.push('is_male = ?');
    params.push(is_male);
  }
  if (calories_to_cut != null) {
    fields.push('calories_to_cut = ?');
    params.push(calories_to_cut);
  }
  params.push(req.user.id);
  try {
    await db.execute(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, params);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};
