const express = require('express');
const axios = require('axios');
const config = require('../config.js');

const app = express();
const port = 3000;

app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.json());

// Routes for Products
// Get all products
app.get('/products', (req, res) => {
  const options = {
    method: 'get',
    headers: {
      Authorization: config.token,
    },
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products?page=${req.query.page}&count=${req.query.count}`,
  };
  axios(options)
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// get all product styles for id
app.get('/products/:product_id/styles', (req, res) => {
  const options = {
    method: 'get',
    headers: {
      Authorization: config.token,
    },
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${req.params.product_id}/styles`,
  };
  axios(options)
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// get all related product ids for given product
app.get('/products/:product_id/related', (req, res) => {
  const options = {
    method: 'get',
    headers: {
      Authorization: config.token,
    },
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${req.params.product_id}/related`,
  };
  axios(options)
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// get product by id
app.get('/products/:product_id', (req, res) => {
  const options = {
    method: 'get',
    headers: {
      Authorization: config.token,
    },
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${req.params.product_id}`,
  };
  axios(options)
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
