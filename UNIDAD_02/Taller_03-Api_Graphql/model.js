const mongoose = require('mongoose')
const Schema = mongoose.Schema

const req_string = {
    type: String,
    required: true,
}

const cliente_schema = new Schema({
    nombre: req_string,
    telefono: req_string
})

const model = mongoose.model('Cliente', cliente_schema)
module.exports = model