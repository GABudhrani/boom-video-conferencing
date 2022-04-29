const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static('./public/'));

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: true,
    saveUninitialized: true
}))

app.use(async(req, res, next) => {
    isLoggedIn = "Non-Authenticated User";
    if (req.session.user) {
        isLoggedIn = "Authenticated User";
    } else {
        isLoggedIn = "Non-Authenticated User";
    }
    currentTimestamp = new Date().toUTCString();
    reqMethod = req.method;
    reqRoute = req.originalUrl;
    console.log(`[${currentTimestamp}] ${reqMethod} ${reqRoute} (${isLoggedIn})`);
    next();
});



app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});