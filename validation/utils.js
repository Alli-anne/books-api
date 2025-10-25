const utils = {};

utils.missingString = (req, res, next) => {
    if (!req.body.title || !req.body.author || !req.body.year || !req.body.genre) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    next();

}

module.exports = utils;