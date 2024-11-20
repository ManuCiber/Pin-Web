const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({message: 'Acceso Denegado'})
    }

    try {
        const verificacion = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verificacion
        next()
    } catch (error) {
        res.status(400).json({message:'Token invalido'})
    }
}

module.exports = auth