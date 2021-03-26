module.exports = (connect, Sequelize) => {
    const Outdoor = connect.define(
        "outdoor", 
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
            photo_url: {
                type: Sequelize.STRING
            },
            nameOfServices: {
                type: Sequelize.STRING
            },
        },
        {
            timestamps: false
        }
    )
    // Outdoor.sync({force:true})
    return Outdoor
}
