const userHome = (req,res)=>{ 
    res.send("Users").status(200)
}

const userID = (req,res)=>{
    const x = req.params.id
    res.send(`id is ${x}`).status(200)
}

module.exports = {userID,userHome}