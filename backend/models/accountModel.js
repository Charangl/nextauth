export default (sequelize, DataTypes) => {
    const Account = sequelize.define("Account", {
        idAccount: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        providerAccountId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expires_at: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        scope: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_token: {
            type: DataTypes.STRING(1500),
            allowNull: false,
        },
        session_state: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return Account;
};
