const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nombre_usuario: {type: String, unique: true, required: true},
    password: {type: String},
    google_id:{type: String},
    azure_id:{type: String}
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)