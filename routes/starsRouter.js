const express = require('express');
const router = express.Router();
const { stars } = require('../controllers')

router.get('/search',stars.getByName);

router.get('/:id',stars.getById);

router.get('/',stars.getAll);



module.exports = router;