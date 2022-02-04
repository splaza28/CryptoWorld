const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const env = require('dotenv');
const path = require('path');
var cookieParser = require('cookie-parser');
const sequelize = require("./config/connection");

const app = express();


env.config();

const static_path = path.join(__dirname, "./public");
app.use(express.static(static_path));

// HBS
app.set("view engine", "hbs");

// Express body parser
app.use(express.urlencoded({ extended: false }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'some randon things',
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


// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use(require("./routes/index.js"));
app.use(require("./routes/users.js"));

const PORT = process.env.PORT || 3002;

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Now Listening ${PORT}!`));
});
