const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Routes Controller
const items = require('./routes/api/items');

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useUnifiedTopology: true,  useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(error => console.log(error));

// Use Routes
app.use('/api/items', items);

// Define PORT
const port = process.env.PORT || 5000;

// Server Listen
app.listen(port, () => console.log(`Server started on port ${port}`));