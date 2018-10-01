var express = require('express');
var router = express.Router();
var userHome = require('../models/userHome');
var http = require('http');

router.post('/:type', function (req, res, next) {
   
    if(req.params.type=="getDetails"){
        userHome.getDetails(req.body, function (err, rows) {
           
                  if (err) {
                      res.json(err);
                  } else {
                      res.json(rows);
                  }
              });
    
    }else if(req.params.type=="propertyDetails"){
        userHome.propertyDetails(req.body, function (err, rows) {
           
                  if (err) {
                      res.json(err);
                  } else {
                      res.json(rows);
                  }
              });
    
    }else if(req.params.type=="getwalksckore"){
        var url = 'http://api.walkscore.com/score?format=json&address='+req.body.address+'&lat='+req.body.latitude+'&lon='+req.body.longitude+'&transit=1&bike=1&wsapikey=2679a4370746815fdc59964ebe5aa4f8';
        http.get(url, (res2) => {
        const { statusCode } = res2;
        const contentType = res2.headers['content-type'];
        let error;
        if (statusCode !== 200) {
          error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error('Invalid content-type.\n' +
                            `Expected application/json but received ${contentType}`);
        }
        if (error) {
          console.error(error.message);
          // consume response data to free up memory
          res2.resume();
          return;
        }
        res2.setEncoding('utf8');
        let rawData = '';
        res2.on('data', (chunk) => { rawData += chunk; });
        res2.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            res.json(parsedData);
          } catch (e) {
            console.error(e.message);
          }
        });
      }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
      });
    }
 
});



module.exports = router;
