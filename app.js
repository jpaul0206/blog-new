const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');

// setting up the express app
const app = express();

const dbURI = 'mongodb+srv://Jasmine:Jasmultiverse02@node-tuts.5a9vhux.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((err) => console.log(err));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define a route to render the index.ejs template

  



// static files
app.use(express.static('public'));

// for post requests
app.use(express.urlencoded({ extended: true }));

// 3rd party middleware
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create Blog' });
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.render('index', { title: 'All Blogs', blogs:result });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then(() => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});


app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
});

// error 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Error 404' });
});