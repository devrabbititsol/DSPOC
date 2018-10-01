var Mssql=require('mssql');
var config = {
    user: 'chapp',
    password: 'Dev$uite2017#!',
    server: 'chapprds.csa36dql5hix.us-west-1.rds.amazonaws.com',
    database: 'DestinationServices',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
const DS = new Mssql.ConnectionPool(config, err => {
})
module.exports.connect = function () {

     return DS
};

