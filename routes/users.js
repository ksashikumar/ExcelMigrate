const express = require('express');

const router = express.Router();

const controller = require('../controllers/userController');

/* GET users listing. */
router.get('/valid', controller.validUsersList);

/* GET users listing. */
router.get('/invalid', controller.invalidUsersList);

module.exports = router;
