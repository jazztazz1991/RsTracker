const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        return res.status(403).json({ message: "You must login to perform this action" });
    } else {
        next();
    }
}

module.exports = withAuth;