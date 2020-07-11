require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const url = process.env.DATABASE_URL

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const alienRouter = require('./routes/aliens')
app.use('/aliens',alienRouter)
const postRouter = require('./routes/posts')
app.use('/posts',postRouter)
app.listen(process.env.APP_PORT, () => {
    console.log('Server started')
})