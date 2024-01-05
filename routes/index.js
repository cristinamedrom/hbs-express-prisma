const express = require('express');
const router = express.Router();
const postRoutes = require('./posted');

router.use('/', postRoutes);

module.exports = router;
