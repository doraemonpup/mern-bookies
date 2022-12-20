import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import bookRouter from './routers/books.js';

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/books', bookRouter);

const DB_URI = process.env.DB_URI;
const PORT = process.env.APP_PORT || 4000;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(DB_URI, options)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on: http://localhost:${PORT}`)
    );
  })
  .catch(error => console.log(`${error} did not connect`));
