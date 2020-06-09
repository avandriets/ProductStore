const express = require('express');
const bodyParser = require('body-parser');

const productsRoutes = require('./routes/products');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/products', productsRoutes);

app.listen(3000);
