require( 'dotenv' ).config()

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")
const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/books", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

if (process.env.NODE_ENV === 'production')  {
    app.use( express.static('client/build'))
} else {
    app.use( express.static('public'))
}

app.use(require('./routes/api'))


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})