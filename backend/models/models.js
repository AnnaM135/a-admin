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
const ServicesInfo = require("./ServicesInfo")(db.connect, db.Sequelize)
const Gallery = require("./Gallery")(db.connect, db.Sequelize)
const ProjectName = require("./Project_Name")(db.connect, db.Sequelize)
const Information = require("./Information")(db.connect, db.Sequelize)

db.Admin = Admin
db.ServicesHeader = ServicesHeader
db.ServicesInfo = ServicesInfo
db.Gallery = Gallery
db.ProjectName = ProjectName
db.Information = Information

// Admin - Services-Header
db.Admin.hasMany(db.ServicesHeader, {as: "servicesHeader"})
db.ServicesHeader.belongsTo(db.Admin, {foreignKey: "adminId", as: "admin"})

//Admin - Services-Info
db.Admin.hasMany(db.ServicesInfo, {as: "servicesinfo"})
db.ServicesInfo.belongsTo(db.Admin, {foreignKey: "adminId", as: "admin"})

//Admin - Gallery
db.Admin.hasMany(db.Gallery, {as: "gallery"})
db.Gallery.belongsTo(db.Admin, {foreignKey: "adminId", as: "admin"})

//Admin - Project-Name
db.Admin.hasMany(db.ProjectName, {as: "project_name"})
db.ProjectName.belongsTo(db.Admin, {foreignKey: "adminId", as: "admin"})

// //Gallery - Project-Name
// db.Gallery.hasMany(db.ProjectName, {as: "project_name"})
// db.ProjectName.belongsTo(db.Gallery, {foreignKey: "galleryId", as: "gallery"})


module.exports = db
