const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const saltRounds = 16;
const validations = require('../validations');



async function createUser(username, password) {
    username = validations.checkUsername(username);
    password = validations.checkPassword(password);

    const userCollection = await users();
    const user = await userCollection.findOne({ username: username });
    if (user) {
        throw 'User already exist with that username';
    } else {
        const hash = await bcrypt.hash(password, saltRounds);

        const newUserInfo = {
            username: username,
            password: hash
        };

        const insertUserInfo = await userCollection.insertOne(newUserInfo);
        if (!insertUserInfo.acknowledged || !insertUserInfo.insertedId) {
            throw 'Could not add user';
        }

        return { userInserted: true };
    }
}

async function checkUser(username, password) {
    username = validations.checkUsername(username);
    password = validations.checkPassword(password);

    const userCollection = await users();
    const user = await userCollection.findOne({ username: username });
    if (!user) {
        throw 'Either the username or password is invalid';
    }

    let comparePasswords = false;

    try {
        comparePasswords = await bcrypt.compare(password, user.password);
    } catch (e) {
        console.log(e);
    }

    if (comparePasswords) {
        return { authenticated: true };
    } else {
        throw 'Either the username or password is invalid';
    }
}

module.exports = { checkUser, createUser };