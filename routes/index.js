var express = require('express');
var router = express.Router();

const mainPage = require('../controllers/mainPageController')
const AuthController = require('../controllers/authController');
const langController = require('../controllers/langController');

router.get('/', mainPage.mainPage)
// router.get('/error', mainPage.error)

router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

router.get('/changeLang/:lang', langController.changeLang);
module.exports = router;