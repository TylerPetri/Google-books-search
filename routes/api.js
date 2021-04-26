require("dotenv").config();

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/index.js')
const router = require('express').Router();
const  Books  = require('../models/books');
const checkAuth = require('./auth')

router.get('/api/books', checkAuth, (req,res) => {
    Books.find({})
    .then( booksDB => {
        res.json(booksDB);
      })
    .catch((err) => {
        res.json(err);
      });
})

router.post('/api/books', (req,res) => {
  console.log(req.body)
  const book = req.body.res
 new Books({
      title: book.title,
      description: book.description,
      image: book.imageLinks.thumbnail,
      link: book.previewLink,
      username: req.body.username
    }).save()
  
    res.send('success')
})

router.delete("/api/books/:id", async (req,res) => {
  await Books.deleteOne({_id: req.params.id});
  res.send("Success");
})


router.post('/signup', (req,res) => {
    User.find({username: req.body.username})
        .exec()
        .then(user => {
            if (user.length > 0) {
                return res.status(409).json({
                    message: 'User exists'
                })
            } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                    })
                } else {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: hash
                    })
                    user
                        .save()
                        .then( result => {
                            res.status(201).json({
                                message: 'User created'
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            })
                        })
                    }
                })
            }
        })
})

router.post('/login', (req,res) => {
  User.find({ username: req.body.username })
  .exec()
  .then(user => {
      if (user.length < 1) {
          return res.status(401).json({
              message: 'No such being!'
          })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result)=> {
      if (err) {
        return res.status(401).json({
          message:'Wrong password'
        })
      }
      if (result) {
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        // res.cookie('token', token, {httpOnly:true});
        return res.status(200).json({message: "Auth successful", token, username: req.body.username})
      }
      res.status(401).json({
        message: 'Auth failed'
      })
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
})


router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })

    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router