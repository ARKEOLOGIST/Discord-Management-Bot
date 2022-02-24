const express = require('express');
const port = process.env['PORT'];

const server = express();

server.all('/', (req,res) => {
  res.send('Your bot is alive and kicking!');
})

function keepAlive() {
  server.listen(port, () => {
    console.log("Server is up!");
  })
}

module.exports = keepAlive;