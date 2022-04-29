const express = require('express');
const router = express.Router();
const validation = require('../validations');
const userData = require('../data/users');


router.get('/', async(req, res) => {
    {
        if (req.session.loggedIn) {
            res.redirect('/private')
        } else {
            res.render('users/signup');
        }
    }

});

router.post('/', async(req, res) => {
    let userInfo = req.body;
    try {
        userInfo.username = validation.checkUsername(userInfo.username);
        userInfo.password = validation.checkPassword(userInfo.password);
    } catch (e) {
        return res.status(400).render('users/signup', {
            title: 'Error',
            error: e,
        });
    }

    try {
        const newuser = await userData.createUser(
            userInfo.username,
            userInfo.password
        );
        res.redirect('/login');
    } catch (e) {
        return res.status(500).render('users/signup', {
            title: 'Error',
            error: e,
        });
    }
});



module.exports = router;