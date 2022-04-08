/* eslint-disable */
const express = require('express');
const axios = require('axios');
const config = require('../config.js');

const app = express();
const port = 3000;

app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.json());

// Post Routes for Reviews
app.post('/reviews', (req, res) => {
  console.log('Request needs forwarding to blackbox: ', req.body);
});

// Get route for cart (testing purposes)
app.get('/cart', (req, res) => {
  const options = {
    method: 'get',
    url: `${config.url}/cart`,
    headers: {Authorization: config.token}
  }
  axios(options)
    .then((res) => {
      //console.log('successful get request');
      console.log(res.data);
      //res.send(res.data);
      //res.status(200).send(res.data)
    })
    .catch((err) => res.sendStatus(400));
})

// Post route for cart
app.post('/cart', (req, res) => {
  const options = {
    method: 'post',
    url: `${config.url}/cart`,
    headers: {Authorization: config.token},
    data: req.body
  }
  axios(options)
    .then((res) => res.sendStatus(201))
    .catch((err) => res.sendStatus(500));
})

// All Get Routes
app.use('/', (req, res) => {
  const params = '' || req.originalUrl;
  const options = {
    method: 'get',
    url: `${config.url}${params}`,
    headers: {
      Authorization: config.token,
    },
  };
  axios(options)
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// // Get route for cart
// app.get('/cart', (req, res) => {
//   const options = {
//     method: 'get',
//     url: `${config.url}/cart`,
//     headers: {Authorization: config.token}
//   }
//   axios(options)
//     .then((res) => {
//       console.log(res);
//       res.send(res.data);
//     })
//     .catch((err) => console.log(err));
// })

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
