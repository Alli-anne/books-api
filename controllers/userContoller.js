const { getDb } = require('../database/connect');
const { ObjectId } = require('mongodb');





const getAllUsers = async (req, res) =>{
    const db = getDb();
    const users = await db.collection('users').find().toArray();
    res.status(200).json(users);
}

const getUserID = async (req, res) => {
    const db = getDb();
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const contact = await db.collection('users').findOne({ _id: objectId });
    res.json(contact);
};

const addUser = async (req, res) =>{
    const db = getDb();
    const { username, password } = req.body;
    const result = await db.collection('users').insertOne({ username, password });
    res.status(201).json({ message: 'User added!', id: result.insertedId });
}

const updateUser = async (req, res) => {
    const db = getDb();
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const { username, password } = req.body;
    const result = await db.collection('users').updateOne({ _id: objectId }, { $set: { username, password } });
    res.json({ message: 'User updated!', id: objectId });
};

const deleteUser = async (req, res) => {
    const db = getDb();
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const result = await db.collection('users').deleteOne({ _id: objectId });
    res.json({ message: 'User deleted!', id: objectId });
};

module.exports = { getAllUsers, getUserID, addUser, updateUser, deleteUser };
