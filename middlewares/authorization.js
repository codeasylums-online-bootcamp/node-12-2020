const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {
    try {
        const token = req.get('Authorization')
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded)
        next()
    } catch(err) {
        res.json({err:err}).status(401)
    }
    
}

module.exports = auth