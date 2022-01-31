const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const { sessionChecker } = require("../config/auth");
const Comment = require("../models/comment");


// Home Page
router.get("/", sessionChecker, (req, res) => res.render("signin"));

// Register Page
router.get("/register", sessionChecker, (req, res) => res.render("register"));


// Dashboard
router.get('/dashboard', async (req, res) => {
  if (req.session.user && req.cookies.user_sid) {

    try {
      const commentsData = await Comment.findAll({ raw: true });

      const comments = commentsData.reverse();

      const result = await axios.get('https://api.coinranking.com/v2/coins');

      res.render('dashboard', {
        comments,
        coinData: result.data.data.coins,
        email: req.session.user.email,
        fullName: req.session.user.fullname
      });

    } catch (error) {
      console.log(error)
    }
  } else {
    res.redirect('/');
  }
});


module.exports = router;
