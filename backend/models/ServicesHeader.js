module.exports = (connect, Sequelize) => {
    const ServicesHeader = connect.define(
        "servicesHeader", 
        {
            description: {
                type: Sequelize.STRING
            },
        },
        {
            timestamps: false
        }
    )
    return ServicesHeader
}