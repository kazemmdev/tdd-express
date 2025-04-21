require('dotenv').config();

const authRoutes = require('./routes/auth');

const express = require('express');
const app = express();
app.use(express.json());
app.use(authRoutes);

module.exports = app;
