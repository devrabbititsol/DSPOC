var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var AWS = require('aws-sdk');
var compression = require('compression')
var http = require('http')

var Login = require('./routes/login');
var userHomeService=require('./routes/userHome')
var chatMessage=require('./routes/chatMessage')

const port = 8089;
let app = express(),
  server = http.createServer(app)

app.use(compression())
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser());
app.use('/', express.static(__dirname + "/public"));

app.use('/login', Login);
app.use('/userHome', userHomeService);
app.use('/chatMessage', chatMessage);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});


/*var s3 = new AWS.S3();
    var params = {
        Bucket: 'toolkittesting',
        Key: '0b033e5e-09d9-4d39-888a-d9e20f76ccf1_48.png'
    };
    s3.deleteObject(params, function (err, data) {



      }) */
app.get('*', function (request, response) {

  response.sendFile(path.resolve(__dirname + '/public', '', 'index.html'));
});

/* const server = app.listen(port, () => {
  console.log('Express listening on port', port);
}); */
server.listen(port, () => {
  console.log('info', 'server|start', {port: port, env: app.get('env')})
})
