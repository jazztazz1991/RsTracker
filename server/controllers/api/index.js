const router = require('express').Router();
// const userRoutes = require('./userRoutes');
const teamRoutes = require('./teamRoutes');
const characterRoutes = require('./characterRoutes');

// router.use('/users', userRoutes); // /api/users
router.use('/teams', teamRoutes); // /api/teams
router.use('/characters', characterRoutes); // /api/characters

module.exports = router; // /api