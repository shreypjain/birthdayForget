const express = require("express")
const mongoose = require("mongoose")
const router = require("./router/route")

require("dotenv").config()

port = process.env.PORT || 8000
app = express()

app.get("/api", (req,res) => {
    res.send('Hello World')
})

mongoose
  .connect(process.env.DB_CREDS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    app.use('/shashank', router)
    app.listen(port, () => {
      console.log(`server running on port: http://localhost:${port}/api`);
    });
  })
  .catch((err) => {
    console.error(err);
  });