const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const auth = require('./routes/authRoutes.js')
const propertyRoutes = require('./routes/propertyRoute.js');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(auth);
app.use(propertyRoutes);



mongoose.connect('mongodb+srv://malayt04:uTcZHGK90pXR0WqM@cluster0.sewzybu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(3000, () => {
      console.log("App is running on port 3000");
    });
  });
