const express = require('express');
const bodyParser = require('body-parser');

const productsRoutes = require('./routes/products');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/products', productsRoutes);

app.use((error, req, res, next) => {
  const { statusCode, message } = error;
  res.status(statusCode || 500).json({ message });
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
