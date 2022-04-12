const express = require('express');
const env = require('./.env');
const db_config = require('./DBconnection');
const http = require('http').createServer(app);

http.listen(8080, function () {
    console.log('server on start 8080');
});

