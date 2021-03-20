const Sequelize = require("sequelize")
const dbConfig = require("../config/dbconfig")

const connect = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    operatorAliases: false,
    logging: false
})

const db = {}
db.Sequelize = Sequelize
db.connect = connect

const Admin = require("./Admin")(db.connect, db.Sequelize)
const ServicesHeader = require("./ServicesHeader")(db.connect, db.Sequelize)

db.Admin = Admin
db.ServicesHeader = ServicesHeader

db.Admin.hasMany(db.ServicesHeader, {as: "servicesHeader"})
db.ServicesHeader.belongsTo(db.Admin, {foreignKey: "adminId", as: "admin"})

module.exports = db