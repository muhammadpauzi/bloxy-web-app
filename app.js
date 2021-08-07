require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const { join } = require('path');
const flash = require('connect-flash');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 5000;

// express
app.use(express.static(join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// mongodb
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Mongodb connected.");
}).catch(err => {
    console.log("Mongodb error :", err.message);
    process.exit(1);
})

// sessions
app.use(session({
    name: 'session-id',
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));
app.use(flash());

// passport
app.use(passport.initialize());
app.use(passport.session());
require('./configs/passport')(passport);

// logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/main');

// routes
app.use('/', require('./routes/index'));
app.use('/blogs', require('./routes/blogs'));
app.use('/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}.`);
})