module.exports = (connect, Sequelize) => {
    const Galleri = connect.define(
        "galleri", 
        {
            name_hy: {
                type: Sequelize.STRING
            },
            name_en: {
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
    return Galleri
}