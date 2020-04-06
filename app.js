const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('error', (err) => {
    console.log('Database error:' + err);
});

mongoose.connection.on('connected', () => {
    console.log('Connected to database' + config.database);
});

const app = express();

const users = require('./routes/users');

const PORT = 5000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

app.listen(PORT, () => {
    console.log('Server started at ' + PORT);
});