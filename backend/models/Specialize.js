module.exports = (connect, Sequelize) => {
    const Specialize = connect.define(
        "specialize", 
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
        },
        {
            timestamps: false
        }
    )
    return Specialize
}