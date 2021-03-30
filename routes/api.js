const router = require('express').Router();
const  Books  = require('../models/books');

router.get('/api/books', (req,res) => {
    Books.find({})
    .then( booksDB => {
        res.json(booksDB);
      })
    .catch((err) => {
        res.json(err);
      });
})

router.post('/api/books', (req,res) => {
    Books.create({})
    .then( r => {
        res.json(r);
      })
    .catch( err => {
        res.json(err)
      })
})

module.exports = router