const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
  .post('/', (req, res) => {
    const newCat = { ...req.body };
    res.send(newCat);
  })

  .get('/', (req, res) => {
    res.send({ name: 'Tilly', age: 2, favoriteTreat: 'canned food'
    });
  });
