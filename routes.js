const express = require('express');
const router = express.Router();
const controllers = require('./src/controllers/controller');

router.get('/', controllers.paginaInicial);

router.get('/register', controllers.registrar);
router.post('/register', controllers.postRegistrar);

router.get('/login', controllers.login);
router.post('/login', controllers.postLogin);

module.exports = router;
