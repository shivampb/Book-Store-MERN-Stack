import express from "express";
import { Book } from "../models/bookModel.js";


const router = express.Router();

// Routes
// router.get('/', (req, res) => {
//     console.log(req);
//     res.status(200).send("Server Says Hi");
// });

// for Creating New Books url {http://localhost:5555/books}
router.post('/', async (req, res) => {
    try {

        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            res.status(400).send({ message: "Give All Required Feilds" })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await Book.create(newBook);
        return res.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })

    }
});

// For Showing All Books
router.get('/', async (req, res) => {
    try {
        const AllBooks = await Book.find();

        res.status(200).send({
            total: AllBooks.length,
            data: AllBooks
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error });
    }
});
// For Showing books by ID
router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const book = await Book.findById(id);


        res.status(200).json(book);
    }

    catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error })

    }
});


// Route for Update a Book
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({ message: "Enter all fields" });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Book Not Found" });
        }

        return res.status(200).send({ message: "Book Updated Successfully" });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.statusMessage(400).json({ "message": "book not found" })
        }
        return res.status(200).send({ message: "Book Got Deleted" });
    } catch (error) {
        console.log(error.message);
        return res.status(404).send({ message: error.message });

    }
});

export default router;
