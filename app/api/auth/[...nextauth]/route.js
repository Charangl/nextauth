import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../backend/models/userModel.js"
import bcrypt from "bcrypt"

export const authOptions = {
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
                const existingUser = await User.findOne({ where: { email: credentials.email } });
        
                if (!existingUser) {
                  const saltRounds = 10;
                  const hashedPassword = await bcrypt.hash(credentials.password, saltRounds);
        
                  await User.create({
                    email: credentials.email,
                    password: hashedPassword, 
                  });
                }
        
                return existingUser ? existingUser : null;
              },
            }),
          ],
          secret: process.env.NEXTAUTH_SECRET,
        };
        
        const handler = NextAuth(authOptions);
        export { handler as GET, handler as POST };
