require('dotenv').config();
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { join } = require('path');

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
    console.log("Mongodb error :", err);
    process.exit(1);
})

// sessions
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false
}));

// logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// handlebars
app.engine('.hbs', exphbs({ defaultLayout: "main", extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use('/', require('./routes/index'));

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}.`);
})