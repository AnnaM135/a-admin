module.exports = (connect, Sequelize) => {
    const Project_Name = connect.define(
        "project_name", 
        {
            project_name: {
                type: Sequelize.STRING
            },
            project_title: {
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
    return Project_Name
}