const express = require('express');
const router = express.Router();
const validation = require('../validations');
const userData = require('../data/users');

router.get('/', async(req, res) => {
    {
        if (req.session.loggedIn) {
            res.redirect('/private')
        } else {
            res.render('users/login');
        }
    }

});

router.post('/', async(req, res) => {
    let userInfo = req.body;
    try {
        userInfo.username = validation.checkUsername(userInfo.username);
        userInfo.password = validation.checkPassword(userInfo.password);
    } catch (e) {
        return res.status(400).render('users/login', {
            title: 'Error',
            error: e,
        });
    }

    try {
        const user = await userData.checkUser(
            userInfo.username,
            userInfo.password
        );
        req.session.user = { username: userInfo.username };
        res.render('users/login', { user: req.session.user });
    } catch (e) {
        return res.status(500).render('users/login', {
            title: 'Error',
            error: e,
        });
    }
});



module.exports = router;