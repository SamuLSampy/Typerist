const express = require('express');
const router = express.Router();
const controllers = require('./src/controllers/controller');

router.get('/', controllers.paginaInicial);

router.get('/register', controllers.registrar);
router.post('/register', controllers.postRegistrar);

router.get('/login', controllers.login);
router.post('/login', controllers.postLogin);

router.get('/logout', controllers.logout);

// Services
router.post('/api/game/start', controllers.start);
router.post('/api/game/drawWord', controllers.drawWord);
router.post('/api/game/valide', controllers.valide);
router.post('/api/game/update', controllers.updateGame);
router.post('/api/game/restore', controllers.restore);
router.post('/api/game/erase', controllers.eraseData);

module.exports = router;
