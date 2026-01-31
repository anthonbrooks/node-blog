const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// express app
const app = express();

const dbURI = 'mongodb+srv://anthonybrooks226_db_user:HalupOZWlpWhGxoi@cluster0.hy35ayb.mongodb.net/?appName=Cluster0';
mongoose.connect(dbURI)
    // listen for requests after database connection
    .then(() => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');



// middleware & static files
app.use(express.static('public'));
app.use((morgan('dev')));

// render home
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum Yoshi'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum Mario'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum Bowser'},
    ];
    res.render('index', { title: 'Home', blogs });
});

// render about
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});

// 404 page 
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});