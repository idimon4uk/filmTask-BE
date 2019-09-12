const express = require('express');
const router = express.Router();
const {films} = require('../controllers');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/',films.findAll);

router.post('/file',upload.single('document'),films.import)

router.post('/',films.add)

router.get('/:id', films.getOne)

router.put('/:id',films.edit)

router.delete('/:id',films.delete);

module.exports = router;