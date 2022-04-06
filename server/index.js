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

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
