import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bookRouter from './routers/books.js'

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// routes
app.use('/books', bookRouter)

if (!process.env.DB_URI) {
  throw new Error('Please add your MongoDB URI to .env')
}

const DB_URI = process.env.DB_URI
const PORT = process.env.APP_PORT || 4000
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }

// connect to db
mongoose
  .connect(DB_URI, dbOptions)
  .then(() => {
    // listening for requests
    app.listen(PORT, () =>
      console.log(
        `Connected to DB & Server running on http://localhost:${PORT}`
      )
    )
  })
  .catch(error => console.log(error))
