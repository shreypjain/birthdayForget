const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const friendSchema = mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    birthday : {
        type: Number
    }
})
module.exports = mongoose.model("Friend", friendSchema)