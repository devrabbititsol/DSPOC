var express = require('express');
var router = express.Router();
var chatMessage = require('../models/chatMessage');
var http = require('http');

router.post('/:type', function (req, res, next) {
   
    if(req.params.type=="inputChat"){
        chatMessage.inputChat(req.body, function (err, rows) {
           
                  if (err) {
                      res.json(err);
                  } else {
                      res.json(rows);
                  }
              });
    
    }else if(req.params.type=="getChatDetails"){
        chatMessage.getChatDetails(req.body, function (err, rows) {
           
                  if (err) {
                      res.json(err);
                  } else {
                      res.json(rows);
                  }
              });
    
    }
 
});



module.exports = router;
