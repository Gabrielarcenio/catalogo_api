const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  endpoint: { type: String, required: true },
  method: { type: String, required: true },
  headers: { type: Object },
  body: { type: Object },
});

module.exports = mongoose.model('Api', apiSchema);
