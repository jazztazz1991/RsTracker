const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes); // /api

module.exports = router;
