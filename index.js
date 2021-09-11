const Client = require("mongodb").MongoClient
const Cron = require('cron').CronJob
const schedule = require('node-schedule')
require('dotenv').config();
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)


schedule.scheduleJob('0 0 * * *', () => {
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
              body: `BIRTHDAY ALERT: today (${new Date(Date.now()).toDateString()}) is ${elem["firstName"]}  ${elem["lastName"]}'s birthday.`,
              from: "+16106242053",
              to: "+17327998071"
            }).then(message => {
              console.log(message.status)
            }).catch(err => console.log(err))
            bday.push(elem)
          }
        })
      } catch (err) {
        console.log(err)
      }
    })
})