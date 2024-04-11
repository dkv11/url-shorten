const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String, // It's more common to see String capitalized in Mongoose schemas
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: String } }],
},
    {
        timestamps: true // Corrected from `timestamp` to `timestamps`
    });

const URL = mongoose.model('url', urlSchema);

module.exports = URL;
