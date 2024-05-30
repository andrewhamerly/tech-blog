const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const sequelize = require('./connection');
const authRoutes = require('./controllers/authRoutes');
const postRoutes = require('./controllers/postRoutes');
const userRoutes = require('./controllers/userRoutes');
const { User, Post, Comment } = require('./models');

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware for static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use('/', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`));
});