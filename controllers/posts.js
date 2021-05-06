const Post = require('../models/post');
const User = require('../models/user');
module.exports = app => {

  // CREATE

  app.get('/posts/new', (req, res) => {
    var currentUser = req.user
    res.render('posts-new', { currentUser })
  });

  app.post("/posts/new", (req, res) => {
    if (req.user) {
      var post = new Post(req.body);
      post.author = req.user._id

      post
        .save()
        .then(post => {
          return User.findById(req.user._id)
        })
        .then(user => {
          user.posts.unshift(post)
          user.save()

          res.redirect(`/`)
        })
        .catch(err => {
          console.log(err.message)
        })
    } else {
      return res.sendStatus(401); // UNAUTHORIZED
    }
  });

  // INDEX
  app.get('/', (req, res) => {
    var currentUser = req.user;
    Post.find({}).populate('author').lean()
      .then(posts => {
        res.render('posts-index', { posts, currentUser });
      })
      .catch(err => {
        console.log(err.message);
      })
  });

  // SHOW
  app.get("/posts/:id", function (req, res) {
    var currentUser = req.user;
    Post.findById(req.params.id).populate('comments').lean()
      .then(post => {
        res.render("posts-show", { post, currentUser });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get("/n/:subreddit", function (req, res) {
    var currentUser = req.user;
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then(posts => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
        console.log(err);
      });
  });
};