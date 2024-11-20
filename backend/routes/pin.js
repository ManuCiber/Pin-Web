const express = require('express')
const Pin = require('../models/Pin')
const {body, validationResult} = require('express-validator')
const multer = require('multer')
const path = require('path')
const autenticacion = require('../middleware/auth')

const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,'uploads/')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage})

/*Get All Pins*/

router.get('/', async (req, res) => {
    try {
        const pins = await Pin.find().populate('userId','nombre_usuario')
    } catch (error) {
        res.status(500).json({message:'Error al Obtener Pines', error})
    }
})

/*Add New Pin*/

router.post('/', AuthenticatorAssertionResponse, upload.single('image'), [body('title').notEmpty().withMessage('El título es requerido')],

async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const nuevo_Pin = new Pin({
        title: req.body.title,
        imageUrl: req.file.path,
        userId: req.user.id
    })
    try {
        await nuevo_Pin.save()
        res.status(201).json(nuevo_Pin)
    } catch (error) {
        res.status(400).json({message:'Error al agregar el pin', error})
    }
})

/*Delete a Pin*/

router.delete('/:id', auth, async (req, res) => {
    try {
        await Pin.findByIdAndDelete(req.params.id)
        res.status(204).send()
    } catch (error) {
        res.status(400).json({message:'Error al eliminar el pin', error})
    }
})

module.exports = router