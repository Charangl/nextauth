export default (sequelize, DataTypes) => {
    const Session = sequelize.define("Session", {
        idSession: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        sessionToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Session;
};
