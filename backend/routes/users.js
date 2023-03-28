const express = require('express')
const router = express.Router();
const { user } = require('../models')

router.get('/', (req, res) => { 
    user.findAll()
        .then(users => {
            console.log(users)
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
})

module.exports = router;
