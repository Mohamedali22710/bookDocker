const express = require('express');
const router = express.Router();
const Book = require('./bookModel');

// 1. إضافة كتاب جديد (Create)
router.post('/', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 2. عرض كل الكتب (Read All)
router.get('/', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }); // الأحدث أولاً
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. تعديل كتاب (Update)
router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. حذف كتاب (Delete)
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'delete book success' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;