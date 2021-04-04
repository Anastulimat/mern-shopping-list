const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

// Routes Controller
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

// BodyParser Middleware
app.use(express.json());

// DB config
const db = config.get("mongoURI");

// Connect to MongoDB
mongoose.connect(db, { useUnifiedTopology: true,  useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(error => console.log(error));

// Use Routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Define PORT
const port = process.env.PORT || 5000;

// Server Listen
app.listen(port, () => console.log(`Server started on port ${port}`));