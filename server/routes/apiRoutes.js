const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware'); // Importa o middleware de autenticação

/**
 * @swagger
 * /apis:
 *   get:
 *     summary: Lista todas as APIs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Uma lista de APIs
 */
router.get('/', verifyToken, (req, res) => {
  // Lógica para listar todas as APIs
  res.send('Listando todas as APIs');
});

module.exports = router;
