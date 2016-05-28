require('babel-register')
console.log(1)
const server = require('./src/server.js').default
console.log(2, server)
server()