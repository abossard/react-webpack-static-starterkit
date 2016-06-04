require('babel-register')
const path = require('path');
const server = require('./src/server.js').default
const contentPath = path.join(__dirname, 'content');
server({ contentPath });
