const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const env = require('dotenv');
const path = require('path');
const sequelize = require("./config/connection");
const PORT = process.env.PORT || 3002;
var cookieParser = require('cookie-parser');

const app = express();


env.config();

const static_path = path.join(__dirname, "./public");
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

app.use(session({
  key: 'user_sid',
  secret: 'something random',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});




app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});


app.use(require("./routes/index.js"));
app.use(require("./routes/users.js"));



sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Now Listening ${PORT}!`));
});
