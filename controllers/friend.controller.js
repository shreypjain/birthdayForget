const Friend = require("../models/friend")
const imessage = require("osa-imessage")

//GET req
module.exports.getBirthdays = async (req,res) => {
    try {
    const mins = Date.now() / 60000
    const users = await Friend.find({"birthday":200000})
    users.forEach(element => {
        console.log(element)
    })
    return res.status(200).json({
        'success':true,
        'message':'Birthday messages were sent',
        'body':users
    })
    } catch (err) {
        return res.status(500).json({
            'success':false,
            'message':err.message
        })
    }
}

// Callback for all
module.exports.callback = (req,res) => {
    return res.status(400).json({
        'success':false,
        'callback': true
    })
}
