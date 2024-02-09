import express from "express";
import { PORT } from "./config.js";
import { con } from "./db/connect.js";
import booksRoute from './routes/booksRoute.js';
import cors from "cors";

const app = express();
app.use(express.json());

// Middlewar for cors Handling
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'PUT', 'DELETE', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use('/books', booksRoute);


//connection funtion
con().then(() => {
  app.listen(PORT, () => {
    console.log(`App is listing on port -> ${PORT}`);
  })
})