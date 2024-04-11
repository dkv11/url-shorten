const shortid = require('shortid');
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const { url } = req.body; // Destructuring for clarity
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }
    const shortId = shortid.generate(); // Ensure you're calling the generate method

    try {
        await URL.create({
            shortId: shortId,
            redirectURL: url, // Corrected field name to match schema
            visitHistory: [],
        });

        return res.json({ id: shortId });
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};
