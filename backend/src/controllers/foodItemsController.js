const db = require('../db');

exports.list = async (req, res) => {
  const q = req.query.q || '';
  try {
    const [rows] = await db.execute(
      'SELECT id, name, serving_size, serving_unit, calories FROM food_items WHERE user_id = ? AND name LIKE ? ORDER BY name ASC',
      [req.user.id, `%${q}%`]
    );
    res.json(rows);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.create = async (req, res) => {
  const { name, serving_size, serving_unit, calories, fat, saturated_fat, trans_fat, cholesterol, sodium, carbohydrates, fiber, sugar, protein } = req.body;
  if (!name || !serving_size || !serving_unit || calories == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const [result] = await db.execute(
      'INSERT INTO food_items (user_id, name, serving_size, serving_unit, calories, fat, saturated_fat, trans_fat, cholesterol, sodium, carbohydrates, fiber, sugar, protein) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, name, serving_size, serving_unit, calories, fat || 0, saturated_fat || 0, trans_fat || 0, cholesterol || 0, sodium || 0, carbohydrates || 0, fiber || 0, sugar || 0, protein || 0]
    );
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.sendStatus(500);
  }
};
