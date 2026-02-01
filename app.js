const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

const dbURI = 'mongodb+srv://anthonybrooks226_db_user:HalupOZWlpWhGxoi@cluster0.hy35ayb.mongodb.net/?appName=Cluster0';
mongoose.connect(dbURI)
    // listen for requests after database connection
    .then(() => app.listen(3000))
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((morgan('dev')));

// render home
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// render about
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page 
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});