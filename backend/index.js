const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bookRoutes = require('./book.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send(`
        <div style="direction: rtl; text-align: center; font-family: sans-serif; padding-top: 50px;">
            <h1 style="color: #4f46e5;"> Backend is running </h1>
            <p style="color: #64748b;">hello it ready to adding book</p>
            <a href="/api/books" style="color: #4f46e5;">show list of book(JSON)</a>
        </div>
    `);
});
// Routes
app.use('/api/books', bookRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://root:mysecretpassword@mongodb:27017/library?authSource=admin';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB via Docker'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});