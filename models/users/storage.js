const mongoose = require('mongoose')

const userModel = require('./schema')

const createUserDB = async(user) => {
    const newUser = new userModel({
        _id: new mongoose.Types.ObjectId(),
        ...user
    })

    try{
        const saved = await newUser.save()
        return saved
    }
    catch(err){
        console.log(err)
        return {data:[],err:err}
    }
}

const getAllUsersDB = () => {
    try{
        const promise = userModel.find()
            .select('-password')
            .exec()
            .then(data=> {return {data:data}})
            .catch(err=>{return {err:err,data:[]}})
        return promise
    }
    catch(err){
        console.log(err)
        return {data:[],err:err}
    }
}

const getUserDB = (id) => {
    try{
        const promise = userModel.findById(id)
            .select('-password')
            .exec()
            .then(data=> {return {data:data}})
            .catch(err=>{return {err:err,data:{}}})
        // find -> array of objects
        // findById -> object
        return promise
    }
    catch(err){
        console.log(err)
        return {data:{},err:err}
    }
}

const deleteUserDB = (id) => {
    try{
        const promise = userModel.findByIdAndDelete(id)
            .select('-password')
            .exec()
            .then(data=> {return {data:data}})
            .catch(err=>{return {err:err,data:{}}})
        return promise
    }
    catch(err){
        console.log(err)
        return {data:{},err:err}
    }
}

const updateUserDB = (email,newName) => {
    try{
        const promise = userModel.findOneAndUpdate({email:email},{$set:{name:newName}})
            .select('-password')
            .exec()
            .then(data=> {return {data:data}})
            .catch(err=>{return {err:err,data:{}}})
        return promise
    }
    catch(err){
        console.log(err)
        return {data:{},err:err}
    }
}

const getUserFromEmail = (email) => {
    try{
        const promise = userModel.findOne({email:email})
            .exec()
            .then(user => {
                return {user:user}
            })
            .catch(err=>{
                return {user:{},err:err}
            })
        return promise
    }
    catch(err){
        console.log(err)
        return {user:{},err:err}
    }
}

module.exports = {createUserDB,getAllUsersDB,getUserDB,deleteUserDB, updateUserDB, getUserFromEmail}