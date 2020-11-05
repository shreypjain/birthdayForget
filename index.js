const express = require("express")
const imessage = require("osa-imessage")
const Client = require("mongodb").MongoClient
require("dotenv").config()


port = process.env.PORT || 8000
app = express()

app.get("/api", (req,res) => {
    res.send('Hello World')
})

Client.connect(process.env.DB_CREDS, { useUnifiedTopology: true})
  .then(client => {
    console.log("Connected to the database")
    app.set('json spaces',2)
    app.get('/', async (req,res) => {
      try {
      const mins = Date.now() / 60000
      col = client.db('birthday').collection('friends')
      users = await col.find().toArray()
      bday = []
      users.forEach(elem => {
        date = (Date.now() - elem["birthday"]) / 31536000000
        if(date > 0 && date < 86400000) {
          imessage.handleForName(elem["firstName"]).then(handle => {
            imessage.send(handle,`Happy birthday ${elem["firstName"]}, have an amazing ${age+1}th`)
            bday.push(elem)
          })
        }
      })
      return res.status(200).json({
          'success':true,
          'message':'Birthday messages were sent',
          'body':bday
      })
      } catch (err) {
          return res.status(500).json({
              'success':false,
              'message':err.message
          })
      }
  })
  app.listen(port, () => {
    console.log(`Server address: http://localhost:${port}`)
  })
  }).catch(
    error => console.log(error)
  )