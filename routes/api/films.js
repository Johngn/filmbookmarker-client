const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Film model
const Film = require('../../models/Film');
const User = require('../../models/User');

// @route   GET /api/films
// @desc    get current users watchlist
// @access  Private
router.get('/:userID', auth, async (req, res) => {
    try {
        const watchlist = await Film.find({ user: req.params.userID });

        res.json(watchlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/films
// @desc    add film to watchlist
// @access  Private
router.post('/', auth, async (req, res) => {
    Film.exists(
        {
            title: req.body.title,
            user: req.user.id,
            overview: req.body.overview,
        },
        (err, filmExists) => {
            if (!filmExists) {
                try {
                    const newFilm = new Film({
                        user: req.user.id,
                        title: req.body.title,
                        year: req.body.year,
                        overview: req.body.overview,
                        poster_path: req.body.poster_path,
                    });

                    newFilm.save().then(film => res.json(film));
                } catch (err) {
                    console.log(err.message);
                    res.status(500).send('Server error');
                }
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Film already on your watchlist',
                });
            }
        }
    );
});

// @route   DELETE /api/films
// @desc    delete film
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Film.findById(req.params.id)
        .then(film => film.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
