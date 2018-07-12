const bodyParser = require('body-parser');
const dbUrl = 'mongodb://localhost/eventApp';
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

const app = express();
const router = express.Router();

mongoose.Promise = Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const allowedOrigins = ['http://localhost:3000'];

app.use(require('surprise-cors')(allowedOrigins));

app.use('/api/events', require('./routing/events/route'));

mongoose.connect(dbUrl).then(() => {
  console.log('Server is running on port: 8030');
  app.listen(8030);
});

module.exports = app;
