// server/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const Api = require('../models/Api'); // Modelo da API

// Rota para listar todas as APIs
router.get('/', async (req, res) => {
  try {
    const apis = await Api.find();
    res.json(apis);
  } catch (err) {
    res.status(500).send('Erro ao listar APIs');
  }
});

// Rota para criar uma nova API
router.post('/', async (req, res) => {
  const { name, description, endpoint, method, headers, body } = req.body;
  const newApi = new Api({ name, description, endpoint, method, headers, body });

  try {
    await newApi.save();
    res.status(201).json(newApi);
  } catch (err) {
    res.status(400).send('Erro ao criar API');
  }
});

// Rota para atualizar uma API existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, endpoint, method, headers, body } = req.body;

  try {
    const api = await Api.findByIdAndUpdate(id, { name, description, endpoint, method, headers, body }, { new: true });
    if (!api) return res.status(404).send('API não encontrada');
    res.json(api);
  } catch (err) {
    res.status(400).send('Erro ao atualizar API');
  }
});

// Rota para deletar uma API existente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const api = await Api.findByIdAndDelete(id);
    if (!api) return res.status(404).send('API não encontrada');
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Erro ao deletar API');
  }
});

module.exports = router;