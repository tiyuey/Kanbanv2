const express = require('express');
const app = express();

require('dotenv').config()

const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(cookieParser());
app.use(
    session({
        name: 'sessions',
        secret: 'secret',
        saveUninitialized: false,
        resave: false,
        },
    )
);
const routes = require('./routes/main');
app.use(routes)

module.exports = app