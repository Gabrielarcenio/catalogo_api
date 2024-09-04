const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Modelo de usuário
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Registra um novo usuário no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro ao registrar usuário
 */
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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login de um usuário
 *     description: Faz login de um usuário com base no nome de usuário e senha fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Senha inválida
 */
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
