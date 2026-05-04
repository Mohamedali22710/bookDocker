const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, ' book title req'] 
    },
    author: { 
        type: String, 
        required: [true, ' book author is req'] 
    },
    description: String,
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Book', bookSchema);