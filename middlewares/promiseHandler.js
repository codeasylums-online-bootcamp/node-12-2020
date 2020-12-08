const handlePromise = (promise, res) => {
    promise.then(data=>{
        res.json(data).status(200)
    })
    .catch(err=>{
        res.json({err:err}).status(500)
    })
}

module.exports = {handlePromise}