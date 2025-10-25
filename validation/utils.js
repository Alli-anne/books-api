const utils = {};

utils.validateBook = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT')  {
        const { title, author, year, genre } = req.body;

        if (!title || !author || !year || !genre){
             if (!title || !author || !year || !genre) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check types (title, author, genre should be strings, year a number)
    if (typeof title !== 'string' || typeof author !== 'string' || typeof genre !== 'string') {
      return res.status(400).json({ error: 'Title, author, and genre must be strings' });
    }
    if (typeof year !== 'number') {
      return res.status(400).json({ error: 'Year must be a number' });
    }
        }
        next();
    }

}

utils.validateBookId = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }

    next();
}
module.exports = utils;