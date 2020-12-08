const {createUserDB,getAllUsersDB,getUserDB,deleteUserDB,updateUserDB} = require('../models/users/storage')

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
        const data = await createUserDB({name,email,password,confPassword})
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


module.exports = {createUser,getAllUsers,getUser,deleteUser,updateUser}
