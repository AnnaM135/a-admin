module.exports = (connect, Sequelize) => {
    const Admin = connect.define(
        "admin", 
        {
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
        },
        {
            timestamps: false
        }
    )
    return Admin
}