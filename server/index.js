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

const DB_URL = 'mongodb://localhost:27017/bookies';
const PORT = process.env.PORT || 4000;

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on: http:localhost:${PORT}`)
    );
  })
  .catch(error => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);
