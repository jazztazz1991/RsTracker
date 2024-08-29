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

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.status(200).json(userData)
        })
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log('login route hit')
        console.log(req.body.username)
        const userData = await User.findOne({
            where: { username: req.body.username },
        });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        userData.password = null;

        const token = jwt.sign({ id: userData.id }, process.env.SESS_SECRET, { expiresIn: '1h' });
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            console.log(req.session)
            res.status(200).json({
                userData,
                token,
            });
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    try {
        console.log('logout route hit')
        console.log(req.session)
        if (req.session) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/addAccount', withAuth, async (req, res) => {
    try {
        console.log('add account route hit')
        console.log(req.body)
        const userData = await User.findOne({
            where: { username: req.body.username },
        });
        console.log(userData)
        userData.password = null;
        
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

module.exports = router;