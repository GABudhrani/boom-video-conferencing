const signUpRoutes = require('./signup');
const loginRoutes = require('./login');

const constructorMethod = (app) => {
    // app.use('/', userRoutes);
    app.use('/signup', signUpRoutes);
    app.use('/login', loginRoutes);

    app.use('/logout', (req, res) => {
        req.session.destroy();
        res.render('users/login');
    });

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;