const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});



app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });