import express from "express";
import { PORT } from "./config.js";
import { con } from "./db/connect.js";
import { Book } from "./models/bookModel.js";


const app = express();
app.use(express.json());


// Routes
app.get('/', (req, res) => {
  console.log(req);
  res.status(200).send("Server Says Hi");
});

// for Creating New Books urk {http://localhost:5555/books}
app.post('/books', async (req, res) => {
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
    return res.status(200).send(book);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })

  }
});

// For Showing All Books
app.get('/books', async (req, res) => {
  try {
    const AllBooks = await Book.find({});

    res.status(200).json({
      total: Book.length,
      data: AllBooks
    });
  }

  catch (error) {
    console.log(error.message);
    res.status(404).send({ message: error })

  }
});

//connection funtion
con().then(() => {
  app.listen(PORT, () => {
    console.log(`App is listing on port -> ${PORT}`);
  })
})