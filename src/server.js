require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 6000;
app.use(cors());
app.post('*', cors());
app.options('*', cors());
app.use(express.json({ limit: '40mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(helmet());
app.use('*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const uri = process.env.DB_URL;
mongoose.connect(uri, {
  useNewUrlParser: true, useUnifiedTopology: true,
});

const { connection } = mongoose;
connection.once('open', () => {
  console.log('Mongodb database connection established');
});

app.use(session({ secret: 'secret' }));

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', require('./routes/machine'));
app.use('/api', require('./routes/user'));

app.use('*', (req, res) => {
  res.status(404).json({ status: false, message: 'Address not found' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
