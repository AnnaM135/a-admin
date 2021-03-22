module.exports = (connect, Sequelize) => {
    const Gallery = connect.define(
        "gallery", 
        {
            project_name: {
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
    return Gallery
}