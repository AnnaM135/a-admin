module.exports = (connect, Sequelize) => {
    const ServicesInfo = connect.define(
        "servicesinfo", 
        {
            name: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
        },
        {
            timestamps: false
        }
    )
    return ServicesInfo
}