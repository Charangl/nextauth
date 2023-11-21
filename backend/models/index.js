import dbConfig from "../config/db.config.js";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
    }
);

sequelize
    .authenticate()
    .then(() => console.log("Connexion à la base de données réussie !"))
    .catch((error) =>
        console.log("Connexion à la base de données échouée !", error)
    );

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

import User from "./userModel.js"
db.User = User(sequelize, DataTypes);

import Session from "./sessionModel.js"
db.Session = Session(sequelize, DataTypes);

import Account from "./accountModel.js"
db.Account = Account(sequelize, DataTypes);

import VerificationToken from "./verificationTokenModel.js"
db.VerificationToken = VerificationToken(sequelize, DataTypes);


db.sequelize.sync({ force: false }).then(() => {
    console.log("Resync Db");
});

export default db;