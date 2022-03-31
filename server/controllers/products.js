const express = require('express');

const axios = require('axios');
// eslint-disable-next-line import/extensions
const config = require('../../config.js');

const router = express.Router();

router.get('/', (req, res) => {
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
router.get('/:product_id/styles', (req, res) => {
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
router.get('/:product_id/related', (req, res) => {
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
router.get('/:product_id', (req, res) => {
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

module.exports = router;
