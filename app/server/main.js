var express = require('express');
var path = require('path');

var app = express();
var port = 9876;

app.use('/', express.static(path.resolve(path.join(__dirname, '../../public'))));


app.listen(port);
