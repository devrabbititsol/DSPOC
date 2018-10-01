var express = require('express');
var router = express.Router();
var Login = require('../models/login');

router.post('/', function(req, res, next) {
   
    Login.authCheck(req.body.data.userName, req.body.data.Pwd, function(err, rows) {
        console.log(err, rows);
        if (err) {
            res.json(err);
        } else {
          res.json(rows ? rows : {}); //or return count for 1 & 0
        }
    });
});



module.exports = router;
