const utils = {};

utils.errorHandler = (req, res, next) => {
try{
    const book = Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get book' });
}
if ((req.method === 'POST' || req.method === 'PUT') && (!req.body.title || typeof req.body.title !== 'string')) {
  return res.status(400).json({ error: 'Title is required and must be a string' });
}
  next();

}

module.exports = utils;