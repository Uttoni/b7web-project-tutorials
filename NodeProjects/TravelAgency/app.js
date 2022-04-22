const express = require('express');
const mustache = require('mustache-express');
const helpers = require('./helpers');
const router = require('./routes/index');
const errorHandler = require('./handlers/errorHandler');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.use(cookieParser(process.env.SECRET));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.teste = "123";
    res.locals.flashes = req.flash();
    next();
});

app.use('/', router);
app.use(errorHandler.notFound);

app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

module.exports = app;