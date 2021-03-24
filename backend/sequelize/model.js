const { Sequelize, DataTypes} = require('sequelize');


exports.sequelize = new Sequelize(process.env.DBNAME,process.env.DBUSERNAME,process.env.DBPASSWORD,{
    host:'127.0.0.1',
    dialect:'mysql'
})


// exports.information = sequelize.define('information',{
    
// })