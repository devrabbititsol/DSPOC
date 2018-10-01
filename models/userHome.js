var db = require('../dbconnection');
var DSConnection = db.connect()
var requests= DSConnection.request();
var _ = require('lodash');
//var session = require('express-session')
//var randomize = require('randomatic');
//var passwordHash = require('password-hash');

var userHome = {
    
    getDetails: function (data, callback) {
        
        requests.query("SELECT * from v_ItineraryProperties where ItineraryID="+data.itineraryId+ " and FileNum="+data.FileNum, callback);
    },
    propertyDetails: function (data, callback) {
        
        requests.query("SELECT *, [1x1RentLo] AS OneByOneRentLo from v_ItineraryProperties where ItineraryPropertyID="+data.ItineraryPropertyID, callback);
    }
    

};

module.exports = userHome;
