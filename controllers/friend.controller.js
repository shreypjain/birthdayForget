const Friend = require("../models/friend")

//GET req
module.exports.getBirthdays = async (req,res) => {
    try {
    const users = await user.find({"birthday":200000})
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
            'message':err
        })
    }
}

//Callback for all
module.exports.callback = (req,res) => {
    return res.status(400).json({
        'success':false,
        'callback': true
    })
}
