const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, Node.js');
});

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
