const express = require('express');
// eslint-disable-next-line import/extensions
const productRouter = require('./controllers/products.js');

const app = express();
const port = 3000;

app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.json());
app.use('/products', productRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
