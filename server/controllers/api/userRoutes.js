const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        console.log('register route hit')
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        const token = jwt.sign({ id: userData.id }, process.env.SESS_SECRET, { expiresIn: '1h' });

        res.status(200).json({ user: userData, token: token, message: 'You are now registered!' });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log('login route hit')

        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const token = jwt.sign({ id: userData.id }, process.env.SESS_SECRET, { expiresIn: '1h' });

        res.json({ user: userData, token: token, message: 'You are now logged in!' });
    } catch (err) {
        res.status(401).json(err);
    }
});

router.post('/logout', (req, res) => {
    try {
        console.log('logout route hit')
        res.status(204).end();
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;