const imessage = require("osa-imessage")
const express = require("express")

app = express()

imessage.handleForName('Shashank').then(handle => {
    imessage.send(handle,'This was an automated message sent by Nodejs')
})