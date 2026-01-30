const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);


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