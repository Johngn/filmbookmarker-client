const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const films = require("./routes/api/films");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

app.use(function (req, res, next) {
    res.setHeader(
        "Content-Security-Policy",
        "default-src * 'self' https://api.themoviedb.org"
    );
    return next();
});

app.use(function (req, res, next) {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self' https://api.themoviedb.org; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
    );
    next();
});

app.use(bodyParser.json());
app.use(cors());

const db = require("./config/keys").mongoURI;

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Mongodb connected"))
    .catch(() => console.log("Error - Mongodb not connected"));

// Use routes
app.use("/api/films", films);
app.use("/api/users", users);
app.use("/api/auth", auth);

// serve static assets in production
if (process.env.NODE_ENV === "production") {
    // set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
