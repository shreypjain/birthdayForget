const schedule = require('node-schedule')
const text = require('osa-imessage')
const readline = require('readline')


// creating the terminal to read and write
const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// all birthday messages
const messages = [
  'Happy birthday!',
  'Hope you have an amazing day woohoo',
  'lets get some birthday dinner',
  'Happy born day :D',
  'this day, many years ago, you said hello world',
  'imagine if there was an AI sending you all these birthday messages 😂',
  'think about how different your life wouldve been if you were born yesterday instead of today'
]
let name = ''

// setting name of messages being sent
terminal.question('Who do you want to send birthday messages to? ', nameBirthday => {
  name = nameBirthday
  terminal.close()
})

// on the close func being called, this triggers the cron job
terminal.on('close', () => {
  // cron job = schedule script to do something every _ weeks/days/hours/minutes/seconds
  const job = schedule.scheduleJob('0 */1 * * *', (fireDate) => {
    sendText(handle, fireDate)  
  })
})

const sendText = (fireDate) => {
  text.handleForName(name).then(handle => {
    // sends imessages through local database (macOS only)
    text.send(handle, messages[fireDate.getHours() % 6])
    console.log(`sent message at ${fireDate.getHours() % 12} o clock`)
  })
}