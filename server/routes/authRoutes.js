// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Modelo de usuário
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Rota de registro de usuário
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const newUser = new User({ username, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).send('Usuário registrado com sucesso');
  } catch (err) {
    res.status(400).send('Erro ao registrar usuário');
  }
});

// Rota de login de usuário
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send('Usuário não encontrado');

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Senha inválida');

    const token = jwt.sign({ id: user._id }, 'chave-secreta', { expiresIn: '1h' });
    res.json({ auth: true, token });
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
