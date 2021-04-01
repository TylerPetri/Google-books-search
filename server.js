require ('dotenv').config()

const path = require('path')
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


if(process.env.NODE_ENV==="production"){
  app.use(express.static("client/build"))
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/books", {
    useNewUrlParser: true,
    useCreateIndex: true,
});

app.use(require('./routes/api'))

app.get('*', (req, res) => {
  console.log("[HTML GET]: Get React app");
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, function() {
  console.log( `Listening on port ${PORT}` )
})