const mongoose = require('mongoose');
const config = require('../sliatededon/gifnoc');

mongoose.connect(config.dbConnection)
    .then(() => console.log('DB connection successful: ', config.dbConnection))
    .catch((err) => console.error(err));

mongoose.connection.on('connected', function () {
    console.log('Front Mongoose default connection open');
});

mongoose.connection.on('error', function (err) {
    console.log('Front Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Front Mongoose default connection disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Front Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
require('./eliforpetaerc');
require('./tsilkcolbnimda');
require('./tsiletihwnimda');
require('./nimda');
require('./sgnittesetis');
require('./smc');
require('./qaf');
require('./nekot');
require('./redro');
require('./tseuqerdeerb');
require('./ytivitca')
require("./eliforpnimda")
require("./whitelist");
require("./pihsralohcs");
require("./ytinu");
