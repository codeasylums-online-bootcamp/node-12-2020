const express = require('express')
const router = express.Router()

const {getAllUsers, createUser, getUser, deleteUser, updateUser, login} = require('../controllers/users')
const auth = require('../middlewares/authorization')

// /user/abc -> /abc
router.post('/',createUser) // path = "/"

router.get('/',getAllUsers)

router.get('/:id', getUser)

router.delete('/:id', deleteUser)

router.put('/update', auth, updateUser)

router.post('/login', login)

module.exports = router

// require('../controllers/users') -> {
//     userID : function
//     userHome: function
// }