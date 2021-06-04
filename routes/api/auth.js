const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { validationResult, body } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = require("../../config/keys").jwtSecret;

const User = require("../../models/User");

// @route   GET /api/auth
// @desc    get user with token
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/auth
// @desc    Login user and get token
// @access  Public
router.post(
    "/",
    // validation:
    body("password", "Password is required").exists(),
    // must be real email
    body("email", "Please enter valid email").isEmail(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // get user from database by email
            let user = await User.findOne({ email });

            // check if user exists
            if (!user) {
                return res.status(400).json({
                    errors: [{ msg: "Invalid login" }],
                });
            }

            // check if entered password and decrypted password from db match
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: "Invalid login" }],
                });
            }

            jwt.sign(
                { user: { id: user.id } },
                jwtSecret,
                {
                    expiresIn: "10h",
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
