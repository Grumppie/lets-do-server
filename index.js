import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import Route from './routes/todos.route.js'

const URL = dotenv.config().parsed.URL

const app = express()

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(express.json())

app.use('/todos', Route)

const url = URL
const port = process.env.PORT || 4000

mongoose.connect(url, { useNewUrlParser: true, useUnifiedtopology: true }).then(() => {
    app.listen(port, () => console.log(`server runing on port `, port))
}).catch(error => {
    console.log(error.message);
})
