const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.token;

    if (token) {
        const secretKey = process.env.SESS_SECRET || '';

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }

            req.user = user;
            return next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

module.exports = authenticateToken;