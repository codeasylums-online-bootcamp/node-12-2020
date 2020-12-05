const express = require('express')
const router = express.Router()

const {userID, userHome} = require('../controllers/users')

// /user/abc -> /abc
router.get('/',userHome) // path = "/"

router.get('/:id',userID)

module.exports = router

// require('../controllers/users') -> {
//     userID : function
//     userHome: function
// }