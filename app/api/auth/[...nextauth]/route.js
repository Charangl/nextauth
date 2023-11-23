import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../backend/models/userModel.js";
import bcrypt from "bcrypt";
import SequelizeAdapter, { models } from "./sequelizeAdapter.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const authOptions = {
  pages: { signIn: "/signIn" },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", placeholder: "Enter Email" },
        password: { label: "Password", placeholder: "Password" },
      },
      async authorize(credentials, req) {
        const existingUser = await User.findOne({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(
            credentials.password,
            saltRounds
          );

          await User.create({
            email: credentials.email,
            password: hashedPassword,
          });
        }

        return existingUser ?? null;
      },
    }),
  ],
  adapter: SequelizeAdapter(sequelize, { models: models(sequelize) }),
  session: {
    strategy: "database",
    jwt: false,
    maxAge: 24 * 60 * 60,
    updateAge: 60,
  },
  callbacks: {
    async session({session, token, user}){
      console.log(session, token, user, "session dans route")
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
