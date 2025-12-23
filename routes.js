const express = require('express');
const router = express.Router();
const homeController = require('./src/controllers/homeController');

router.get('/', homeController.paginaInicial);

router.get('/register', homeController.registrar);

module.exports = router;
