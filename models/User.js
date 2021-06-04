const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    films: [{ type: Schema.Types.ObjectId, ref: "film" }],
});

module.exports = User = mongoose.model("user", UserSchema);
