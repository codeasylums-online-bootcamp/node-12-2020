const express = require('express')
const router = express.Router()

const userID = require('../controllers/users').userID
const userHome = require('../controllers/users').userHome

// /user/abc -> /abc
router.get('/',userHome) // path = "/"

router.get('/:id',userID)

module.exports = router

// require('../controllers/users') -> {
//     userID : function
//     userHome: function
// }