const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {createUserDB,getAllUsersDB,getUserDB,deleteUserDB,updateUserDB,getUserFromEmail} = require('../models/users/storage')

const generateHash = (password) => {
    const hash = bcrypt.hashSync(password, 10)
    return hash
}

const createUser = async(req, res) => {
    const {name, email, password, confPassword} = req.body

    if(!name){
        res.json({msg:"Name is empty"}).status(400)
    }
    else if(!email){
        res.json({msg: "Email is empty"}).status(400)
    }
    else if(!password || !confPassword || password!==confPassword){
        res.json({msg: "invalid password and confirm password"}).status(400)
    }
    else{
        const hashedPassword = generateHash(password)
        const data = await createUserDB({name,email,password:hashedPassword,confPassword})
        let status = 201
        if(data.err){
            status = 400
        }
        res.json(data).status(status)    
    }
}

const getAllUsers = async(req,res) => {
    const users = await getAllUsersDB()
    let status = 200
    if(users.err){
        status = 500
    }
    res.json(users).status(status)
}

const getUser = async(req,res) => {
    const id = req.params.id
    const user = await getUserDB(id)
    let status = 200
    if(user.err){
        status = 400
    }
    res.json(user).status(status)
}

const deleteUser = async(req,res) => {
    const id = req.params.id
    const data = await deleteUserDB(id)
    let status = 200
    if(data.err){
        status=400
    }
    res.json(data).status(status)
}

//email, update the name
const updateUser = async(req,res) => {
    const {email, newName} = req.body
    if(!email || !newName){
        res.json({err:"Email or newName are empty"}).status(400)
    }
    const data = await updateUserDB(email,newName)
    let status = 200
    if(data.err){
        status=400
    }
    res.json(data).status(status)
}

const login = async(req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        res.json({err:"Email or Password Empty"}).status(400)
    }
    else{
        // username exists or not
        const data = await(getUserFromEmail(email))
        //if username exists then compare password
        // console.log(data)
        if(data.err){
            res.json({err:err}).status(500)
        }
        else{
            const hash = data.user ? data.user.password : ""
            if(bcrypt.compareSync(password,hash)){
                const secret = process.env.SECRET_KEY
                // console.log(secret)
                jwt.sign({id:data.user._id},secret, { algorithm: 'HS256'}, (err, token)=>{
                    if(err){
                        res.json({err:err}).status(500)
                    }
                    else{
                        res.json({token:token}).status(200)
                    }
                })
            }
            else{
                res.json({msg:"incorrect password"}).status(401)
            }
        }
        //if correct password then return success else failure
    }
}

module.exports = {createUser,getAllUsers,getUser,deleteUser,updateUser, login}
