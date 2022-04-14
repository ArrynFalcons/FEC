/* eslint-disable */

const express = require('express');
const axios = require('axios');
const config = require('../config.js');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.json());

//Put Route for Helpful Review
app.post('/helpfulreview', (req, res) => {
  console.log('Forwarding request to blackbox: ', req.body);
  const options = {
    headers: {
      Authorization: config.token,
    },
  };
  axios.put(`${config.url}/reviews/${req.body.id}/helpful`, req.body, options)
    .then((data) => {
      console.log('Successfully marked as helpful!');
      res.send(data.data);
    })
    .catch((err) => {
      console.log('Something went wrong');
      console.log(err);
      res.status(404).send(err);
    });
});

//Put Route for Reporting Review
app.post('/reportreview', (req, res) => {
  console.log('Forwarding request to blackbox: ', req.body);
  const options = {
    headers: {
      Authorization: config.token,
    },
  };
  axios.put(`${config.url}/reviews/${req.body.id}/report`, req.body, options)
    .then((data) => {
      console.log('Successfully reported review');
      res.send(data.data);
    })
    .catch((err) => {
      console.log('Something went wrong');
      console.log(err);
      res.status(404).send(err);
    });
});

const markAsHelpful = (id) => {
  axios.post(`/reviews/${id}/helpful`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Post Routes for New Reviews
app.post('/reviews', (req, res) => {
  console.log('Forwarding request to blackbox: ', req.body);
  const options = {
    headers: {
      Authorization: config.token,
    },
  };
  axios.post(`${config.url}/reviews`, req.body, options)
    .then((data) => {
      console.log('Successfully posted to blackbox!');
      res.send(data.data);
    })
    .catch((err) => {
      console.log('Something went wrong');
      console.log(err);
      res.status(404).send(err);
    });
});

// Post route for client click interactions
app.post('/interactions', (req, res) => {
  let options = {
    headers: {
      Authorization: config.token,
    },
  };
  axios.post(`${config.url}/interactions`, req.body, options)
    .then((response) => {
      // we don't want to let client know we're tracking their clicks
      // console.log(response.data);
    })
    .catch((err) => {
      // console.log(err)
    })
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
    .then(() => res.sendStatus(201))
    .catch((err) => res.sendStatus(500));
})

// All Get Routes
app.use('/products', (req, res) => {
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

app.use('/reviews', (req, res) => {
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

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});

module.exports = app;