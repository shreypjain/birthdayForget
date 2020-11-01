const imessage = require("osa-imessage")
const express = require("express")

imessage.handleForName('Shashank').then(handle => {
    imessage.send(handle,'Hello world')
})