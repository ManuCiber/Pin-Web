const errorHandler = (err, req, res, next) => {
   console.error(errorHandler.message)
   res.status(err.status ||500).json({
        message: err.message || 'Error interno del servidor'
   }) 
}

module.exports = errorHandler