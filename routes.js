const express = require('express');
const router = express.Router();
const controllers = require('./src/controllers/controller');

router.get('/', controllers.paginaInicial);

router.get('/register', controllers.registrar);
router.post('/register', controllers.postRegistrar);

router.get('/login', controllers.login);
router.post('/login', controllers.postLogin);

router.get('/logout', controllers.logout);

router.get('/recovery', controllers.recovery)
router.post('/recovery', controllers.recoveryRedirect)

router.get('/reset-password', controllers.resetPassword)

// Services
router.post('/api/game/start', controllers.start);
router.post('/api/game/valide', controllers.valide);
router.post('/api/game/erase', controllers.eraseData);

router.get('/api/user', controllers.getUser);
router.post('/api/user/check-token', controllers.checkToken)
router.post('/api/user/set-password', controllers.setPassword)

module.exports = router;
