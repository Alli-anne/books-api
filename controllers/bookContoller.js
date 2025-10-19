const { getDb } = require('../database/connect');
const { ObjectId } = require('mongodb');

// , DELETE
const getAllBooks = async (req, res) => {
  const db = getDb();
  const books = await db.collection('books').find().toArray();
  res.status(200).json(books);
};

const addTestBook = async (req, res) => {
  try {
    const { title, author, year, genre } = req.body;
    if (!title || !author || !year || !genre) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = getDb();
    const result = await db.collection('books').insertOne({ title, author, year, genre });
    res.status(201).json({ message: 'Book added!', id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add book' });
  }
};
const getBookID = async (req, res) => {
    const db = getDb();
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const contact = await db.collection('books').findOne({ _id: objectId });
    res.json(contact);
};
const updateBook = async (req, res) => {
    const db = getDb();
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const { title, author, year, genre } = req.body;
    const result = await db.collection('books').updateOne({ _id: objectId }, { $set: { title, author, year, genre } });
    res.json({ message: 'Book updated!', id: objectId });
};
const delteBook = async (req, res) => {
    const db = getDb();
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const result = await db.collection('books').deleteOne({ _id: objectId });
    res.json({ message: 'Book deleted!', id: objectId });
};


module.exports = { getAllBooks, addTestBook, getBookID, updateBook, delteBook };