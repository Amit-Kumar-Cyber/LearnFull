const express = require('express');
const router = express.Router();
const compilerService = require('../services/compiler.service');

router.post('/compile', async (req, res) => {
  const { code, languageId } = req.body;

  if (!code || !languageId) {
    return res.status(400).json({ error: 'Code and Language ID are required' });
  }

  try {
    const result = await compilerService.executeCode(code, languageId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
