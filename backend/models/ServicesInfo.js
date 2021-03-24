module.exports = (connect, Sequelize) => {
    const ServicesInfo = connect.define(
        "servicesinfo", 
        {
            name_hy: {
                type: Sequelize.STRING
            },
            title_hy: {
                type: Sequelize.STRING
            },
            name_en: {
                type: Sequelize.STRING
            },
            title_en: {
                type: Sequelize.STRING
            },
        },
        {
            timestamps: false
        }
    )
    return ServicesInfo
}