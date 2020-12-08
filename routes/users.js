const express = require('express')
const router = express.Router()

const {getAllUsers, createUser, getUser, deleteUser, updateUser} = require('../controllers/users')

// /user/abc -> /abc
router.post('/',createUser) // path = "/"

router.get('/',getAllUsers)

router.get('/:id', getUser)

router.delete('/:id', deleteUser)

router.put('/update', updateUser)

module.exports = router

// require('../controllers/users') -> {
//     userID : function
//     userHome: function
// }