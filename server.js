const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
// Correct way to require/render an EJS template


// Or in Express render:


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.get('/', async (req, res) => {
  const posts = await Post.find().sort({ timestamp: -1 });
  res.render('./index.ejs', { posts });
  
});


app.post('/create', async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });
  await newPost.save();
  res.redirect('/');
});


// Start the server
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
