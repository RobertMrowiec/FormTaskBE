const Events = require('../../models/event');
const validator = require("email-validator");

exports.get = defaultResponse(req => Events.find().exec());

exports.post = defaultResponse(async req => {
  if (!validateBody(req.body)) throw ('Wrong request body');
  return new Events(req.body).save();
});

function defaultResponse (func) {
  return (req, res) => func(req, res)
    .then(x => res.status(200).json(x))
    .catch(err => {
        if (err instanceof Error || err instanceof TypeError) {
          console.log(err);
          err = err.message;
        }
        res.status(400).json({ message: err });
    });
}

function validateBody (body) {
  return (Object.keys(body).length === 4 && body.firstName.length > 2 && body.lastName.length > 2 && validator.validate(body.email))
}
