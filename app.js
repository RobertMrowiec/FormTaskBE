const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const allowedOrigins = ['http://localhost:3000'];

app.use(require('surprise-cors')(allowedOrigins));

app.use('/api/events', require('./routing/events/route'));

module.exports = (dbUrl) => {
  return mongoose.connect(process.env.MONGODB_URI || dbUrl).then(x => {
    return app;
  });
};
