const checkConnect = require('./check-connect');
const logging = require('./logging');
const sendMail = require('./sendMail');
const SocketConnect = require('./socketConnect');

module.exports = { sendMail, checkConnect, SocketConnect };
