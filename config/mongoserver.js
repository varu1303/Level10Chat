const mongoose = require('mongoose');

mongoose.connect('mongodb://ed10:edlevel10@ds119302.mlab.com:19302/socketchat', { useMongoClient: true });
//mongoose.connect('mongodb://localhost:27017/socketchat', { useMongoClient: true });

module.exports = mongoose.connection;