const cron = require("node-cron");
const message = require("./message");
let currMsg = 0;
const config = require("config");
const accountSid = config.get("ACCOUNT_SID");
const authToken = config.get("AUTH_TOKEN");
const client = require('twilio')(accountSid, authToken);


function sendMsg(){

    client.messages.create({
      from: 'whatsapp:+14155238886',
      body: `${message[currMsg]}`,
      to: `whatsapp:`+ config.get("PHONE_NR")
    }).then(message => console.log(message));
}

cron.schedule('* * * * *', () => {
    
    console.log('Msg sent!');
    sendMsg();
    currMsg++;
  });