require('dotenv').config();
const express = require('express')
const port = 3000
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express()

app.use(cookieParser());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());


require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
// Set db
require('./data/reddit-db');


app.get('/', (req, res) => {
  res.render('home')
})

app.get('/posts/new', (req, res) => {
  res.render('posts-new')
  console.log("iahlibhjawrgbha")
})


app.listen(port, () => {
  console.log(`We Gucci at http://localhost:${port}`)
})


module.exports = app;