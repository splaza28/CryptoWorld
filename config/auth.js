module.exports = {

    sessionChecker: function (req, res, next) {
      if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
      } else {
        next();
      }
    },
  
  };
  


