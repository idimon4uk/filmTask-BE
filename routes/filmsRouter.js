const express = require('express');
const router = express.Router();
const {films} = require('../controllers')

router.get('/',films.findAll);

router.post('/file',(req,res)=>{
    console.log();
    res.status(200).json(req.body);
})

router.post('/',films.add)

router.get('/:id', films.getOne)

router.put('/:id',films.edit)

router.delete('/:id',films.delete);

module.exports = router;