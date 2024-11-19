const express = require('express')
const Usuario = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')


/*Registro de usuario*/

router.post('/registro',[
    body('nombre_usuario').notEmpty().withMessage('El nombre del usuario es requerido'),
    body('password').isLength({min:6}).withMessage('La contraseña debe de tener al menos 6 caracteres')
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: erros.array()})
    }

    const{nombre_usuario, passowrd} = req.body
    const hashedPassword = await bcrypt.hash(passowrd, 10)
    const usuario = new Usuario({nombre_usuario, password:hashedPassword})

    try {
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({message:'Error en el registro de usuario'})
    }
})


/*Inicio de sesión*/

router.post('/login', async (req, res) => {
    const {nombre_usuario, passowrd} = req.body
    const user = await Ususario.findOne({nombre_usuario})
    if(!Usuario){
        return res.status(400).json({message: 'Usuario no encontrado'})
    }

    const is_Match = await bcrypt.compare(passowrd, Usuario.password)
    if(!is_Match){
        return res.status(400).json({message: 'Contraseña incorrecta'})
    }
    const token = jwt.sign({id:userid}, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.json({token})
})

module.exports = router