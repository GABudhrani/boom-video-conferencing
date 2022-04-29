module.exports = {
    checkUsername(username) {
        if (!username) throw `Error: You must supply a username!`;
        if (typeof username !== 'string') throw `Error: username must be a string!`;
        username = username.trim();
        if (username.length === 0)
            throw `Error: username cannot be an empty string or string with just spaces`;
        if (username.length < 4)
            throw `Error: username should be atleat 4 characters long`;
        if (username.includes(' ')) {
            throw 'Error: username should not contain any spaces';
        }
        username = username.toLowerCase();
        return username;
    },

    checkPassword(password) {
        if (!password) throw `Error: You must supply a password!`;
        if (typeof password !== 'string') throw `Error: password must be a string!`;
        password = password.trim();
        if (password.length === 0)
            throw `Error: Password cannot be an empty string or string with just spaces`;
        if (password.length < 6)
            throw `Error: Password should be atleat 6 characters long`;
        if (password.includes(' ')) {
            throw 'Error: Password should not contain any spaces';
        }
        return password;
    }
};