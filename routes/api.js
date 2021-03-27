const router = require('express').Router();
const mongoose = require('mongoose');
const { Books } = require('../models/index');

router.get('/api/books', (req,res) => {
    Books.find({})
    .then( r => {
        res.json(r);
      })
    .catch((err) => {
        res.json(err);
      });
})

router.post('/api/books', (req,res) => {
    Books.insertOne({})
    .then( r => {
        res.json(r);
      })
    .catch( err => {
        res.json(err)
      })
})

module.exports = router