module.exports = (connect, Sequelize) => {
    const Information = connect.define(
        "information", 
        {
            name:{
                type: Sequelize.STRING
            },
            info_hy:{
                type: Sequelize.STRING
            },
            info_en:{
                type: Sequelize.STRING
            },
        },
        {
            timestamps: false
        }
    )
    return Information
}