const Client = require("mongodb").MongoClient
const Cron = require('cron').CronJob
const express = require('express')
const http = require('http')
require('dotenv').config();
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const getBirthdays = (req, res) => {
  Client.connect(process.env.DB_CREDS, {
      useUnifiedTopology: true
    })
    .then(async client => {
      console.log("Connected to the database")
      try {
        const mins = Date.now() / 60000
        col = client.db('birthday').collection('friends')
        users = await col.find().toArray()
        bday = []
        users.forEach(elem => {
          date = (Date.now() - elem["birthday"]) / 31557600000
          if (date - Math.floor(date) > 0 && date - Math.floor(date) < 0.0027) {
            console.log(`today is ${elem["firstName"]}'s birthday`)
            twilio.messages.create({
              body: `BIRTHDAY ALERT: today (${new Date(Date.now()).toDateString()}) is ${elem["firstName"]} ${elem["lastName"]}'s birthday.`,
              from: "+16106242053",
              to: "+17327998071"
            }).then(message => {
              console.log(message.status)
            }).catch(err => console.log(err))
            twilio.messages.create({
              body: `BIRTHDAY ALERT: today (${new Date(Date.now()).toDateString()}) is ${elem["firstName"]} ${elem["lastName"]}'s birthday.`,
              from: "+16106242053",
              to: "+18482521431"
            }).then(message => {
              console.log(message.status)
            }).catch(err => console.log(err))
            bday.push(elem)
          }
        })
        return res.status(200).json({
          success: true,
        })
      } catch (err) {
        console.log(err)
        return res.status(500).json({
          success: false,
        })
      }
    })
}

const app = express()

app.get('/', getBirthdays)

server = http.createServer(app)
server.listen(process.env.PORT)