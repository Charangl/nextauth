import { DataTypes } from "sequelize";

export default function SequelizeAdapter(sequelize) {
  return {
    async createUser(user) {
      console.log(user, "createUser");
      const newUser = await sequelize.models.user
        .create(user)
        .then((res) => res?.toJSON());
      newUser.id = newUser.idUser;
      delete newUser.idUser;
      console.log(newUser, "newUser dans createUser");
      return newUser;
    },
    async getUser(id) {
      console.log(id, "getUser");
      return;
    },
    async getUserByEmail(email) {
      console.log(email, "getUserByEmail");
      const existingUser = await sequelize.models.user
        .findOne({ where: { email: email } })
        .then((res) => res?.toJSON());
      existingUser.id = existingUser.idUser;
      delete existingUser.idUser;
      return existingUser;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      console.log(providerAccountId, provider, "getUserByAccount");
      const existingUser = await sequelize.models.user
        .findOne({
          include: [
            {
              model: sequelize.models.Account,
              where: { providerAccountId, provider },
            },
          ],
        })
        .then((res) => res?.toJSON());
      existingUser.id = existingUser.idUser;
      delete existingUser.idUser;
      return existingUser;
    },
    async updateUser(user) {
      console.log(user, "updateUser");
      return;
    },
    async deleteUser(userId) {
      console.log(userId, "deleteUser");
      return;
    },
    async linkAccount(account) {
      console.log(account, "linkAccount");
      const newAccount = await sequelize.models.Account.create({
        ...account,
        idUser: account.userId,
      }).then((res) => res?.toJSON());
      return newAccount;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      console.log(providerAccountId, provider, "unlinkAccount");
      return;
    },
    async createSession({ sessionToken, userId, expires }) {
      console.log(sessionToken, userId, expires, "createSession");
      const newSession = await sequelize.models.Session.create({
        expires,
        sessionToken,
        idUser: userId,
      }).then((res) => res?.toJSON());
      return newSession;
    },
    async getSessionAndUser(sessionToken) {
      console.log(sessionToken, "getSessionAndUser");
      const existingUser = await sequelize.models.user
        .findOne({
          include: [
            { model: sequelize.models.Session, where: { sessionToken } },
          ],
        })
        .then((res) => res?.toJSON());
      existingUser.id = existingUser.idUser;
      delete existingUser.idUser;
      console.log(existingUser, "existingUser")
      return {session: existingUser.Sessions[0], user : existingUser};
    },
    async updateSession({ sessionToken }) {
      console.log(sessionToken, "updateSession");
      return;
    },
    async deleteSession(sessionToken) {
      console.log(sessionToken, "deleteSession");
      return;
    },
    async createVerificationToken({ identifier, expires, token }) {
      console.log(identifier, token, expires, "createVerificationToken");
      return;
    },
    async useVerificationToken({ identifier, token }) {
      console.log(identifier, token, "useVerificationToken");
      return;
    },
  };
}

export function models(sequelize) {
  const User = sequelize.define("user", {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

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
      type: DataTypes.TIME,
      allowNull: false,
    },
  });

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
    },
  });

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

  User.hasMany(Account, { foreignKey: "idUser" });
  Account.belongsTo(User, { foreignKey: "idUser" });

  User.hasMany(Session, { foreignKey: "idUser" });
  Session.belongsTo(User, { foreignKey: "idUser" });

  return {
    User,
    VerificationToken,
    Account,
    Session,
  };
}
