const express = require("express");
const router = express.Router();
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = require("../../config/keys").jwtSecret;

// User model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
    "/",
    // validation:
    body("email", "Email is required").not().isEmpty(),
    body("password", "Password is required").not().isEmpty(),
    // must be real email
    body("email", "Please enter valid email").isEmail(),
    // password must be at least 6 chars long
    body("password", "Password must be at least 6 characters long").isLength({
        min: 6,
    }),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    errors: [{ msg: "Email already registered" }],
                });
            }

            user = new User({
                email,
                password,
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

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
