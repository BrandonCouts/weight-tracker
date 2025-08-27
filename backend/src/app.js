require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const weightRoutes = require('./routes/weights');
const foodRoutes = require('./routes/foods');
const foodItemRoutes = require('./routes/foodItems');
const userRoutes = require('./routes/user');
require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/weights', weightRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/food-items', foodItemRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
