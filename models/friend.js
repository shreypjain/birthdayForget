const mongoose = require('mongoose')

const friendSchema = mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: false
    },
    birthday : {
        type: Number,
        required: true
    },
    age : {
        type: Number,
        required: [true, 'must include age']
    }
})
module.exports = mongoose.model("Friend", friendSchema)