import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import db from "@/utils/db";
import { user, userGoogle, userFacebook } from "@/models/data";
import bcrypt from "bcryptjs";

const pepper = process.env.PEPPER;

export const authOptions = {
  //Configure JWT
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.followedNovel = user.followedNovel;
      }
      return token;
    },

    async session({ session, token }) {
      // Set the image property of the user object
      if (session.user.image === undefined) session.user.image = "/avatar.jpg";
      session.user.role = token.role;
      session.user.followedNovel = token.followedNovel;
      return session;
    },
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        //check if user in db
        const existingUser = await userGoogle.findOne({
          email: profile.email,
        });
        if (!existingUser) {
          //if not, create user in db
          await userGoogle.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            followedNovel: [], // add empty followedNovel field
          });
        }
      } else if (account.provider === "facebook") {
        const existingUser = await userFacebook.findOne({
          email: profile.email,
        });
        if (!existingUser) {
          //if not, create user in db
          await userFacebook.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture.data.url,
            followedNovel: [], // add empty followedNovel field
          });
        }
      }
      return true;
    },
  },
  providers: [
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      id: "facebook",
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      async authorize(credentials) {
        try {
          // Connect to the DB
          await db.connect();
          // Find user by name and email
          const userData = await user
            .findOne({
              name: credentials.username,
            })
            .lean();
          // If no user found, return error
          if (!userData) {
            throw new Error("username");
          }
          // Check if password is valid
          const isPasswordValid = await bcrypt.compare(
            credentials.password + pepper,
            userData.password
          );
          // If password is invalid, return error
          if (!isPasswordValid) {
            throw new Error("password");
          }
          // Return user data
          return {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            followedNovel: [],
          };
        } catch (error) {
          throw new Error(error.message);
        } finally {
          await db.disconnect();
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
