import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'
import catsRoute from './routes/categories.js'

const app = express()
dotenv.config()

// Constants

const PORT = process.env.PORT || 3001
const NAME = process.env.NAME
const PASSWORD = process.env.PASSWORD

// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

// Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)
app.use('/api/cats', catsRoute)


async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${NAME}:${PASSWORD}@cluster0.w5uga6x.mongodb.net/news911`,
    )

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}
start()
