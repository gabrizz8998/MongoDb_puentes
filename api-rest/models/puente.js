'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PuentesSchema = Schema({
numero:Number,
nombre: String,
calle: String,
latitud: Number,
longitud: Number
})
module.exports = mongoose.model('Puentes',PuentesSchema)