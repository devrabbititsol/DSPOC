var db = require('../dbconnection');
var DSConnection = db.connect()
var requests= DSConnection.request();
var _ = require('lodash');
//var session = require('express-session')INSERT INTO DS_Chat SET FromPersonID='2',ToPersonID='1',ItineraryPropertyID='9',ChatMessage='tes sfsdf',CreatedDate=NOW()
//var randomize = require('randomatic');
//var passwordHash = require('password-hash');

var chatMessage = {
    
    inputChat: function (data, callback) {
       
        requests.query("INSERT INTO DS_Chat (FromPersonID, ToPersonID, ItineraryPropertyID, ChatMessage, CreatedDate) VALUES ("+data.From+", "+data.To+", "+data.ItineraryPropertyID+", '"+data.TextMessage+"', GETDATE())", callback);
    },
    getChatDetails: function (data, callback) {
        
        requests.query("SELECT * from DS_Chat where ItineraryPropertyID="+data.ItineraryPropertyID, callback);
    }
    

};

module.exports = chatMessage;
