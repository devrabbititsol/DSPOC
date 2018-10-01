var db = require('../dbconnection');
var DSConnection = db.connect()
var requests= DSConnection.request();
var _ = require('lodash');
var session = require('express-session')
var randomize = require('randomatic');
//var passwordHash = require('password-hash');

var login = {
    
     authCheck: function (userName, Pwd, callback) {
        //var hashedPassword = passwordHash.generate(Pwd);
        //console.log("SELECT Id, Email from dbo.AspNetUsers WHERE Email='"+userName+"'", userName, Pwd);
        return requests.query("SELECT Id, Email from dbo.AspNetUsers WHERE Email='"+userName+"'", callback);
        
    }
};

module.exports = login;