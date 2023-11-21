export default (sequelize, DataTypes) => {
    const VerificationToken = sequelize.define("VerificationToken", {
        identifier: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expires: {
            type: DataTypes.TIMESTAMP,
            allowNull: false,
        },
    });

    return VerificationToken;
};
