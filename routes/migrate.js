const express = require('express');

const router = express.Router();

const controller = require('../controllers/migrateController');

router.get('/', controller.index);
router.post('/', controller.startMigrate);

module.exports = router;
