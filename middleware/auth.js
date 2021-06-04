const jwt = require("jsonwebtoken");

const jwtSecret = require("../config/keys").jwtSecret;

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header("x-auth-token");
    // Check if token
    if (!token) {
        return res.status(401).json({ msg: "No token" });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
};
