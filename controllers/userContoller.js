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

const googleAuth = (req, res) => {
    res.redirect('http://localhost:3000/auth/google');
};

const googleAuthCallback = (req, res) => {
    res.redirect('http://localhost:3000/auth/google/callback');
};

const login = (req, res) => {
    res.render('login');
};

const afterGoogleLogin = (req, res) => {
  // req.user is available here
  res.redirect('/dashboard');
};
module.exports = { getAllUsers, getUserID, addUser, updateUser, deleteUser, googleAuth, googleAuthCallback, login, afterGoogleLogin };
