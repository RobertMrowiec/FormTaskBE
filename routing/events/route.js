const events = require('./details');
const express = require ('express');
const router = express.Router();

router.get('/', events.get)
      .post('/', events.post);

module.exports = router;
