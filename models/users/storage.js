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

module.exports = {createUserDB,getAllUsersDB,getUserDB,deleteUserDB, updateUserDB}