import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/prisma";
import NextAuth, { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    // Add new user to database on sign in
    async signIn(user) {
      try {
        const {
          user: { name, email },
        } = user;
        if (!name || !email) {
          return false;
        }
        await connectToDatabase();

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          return true;
        }

        const createdUser = await prisma.user.create({ data: { email, name } });
        if (!createdUser) {
          return false;
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        await prisma.$disconnect();
      }
    },

    // Create a JWT signing the user's email
    async jwt({ token, user }) {
      if (process.env.JWT_SECRET === undefined) {
        throw new Error("JWT_SECRET is not defined");
      }
      if (user) {
        const accessToken = jwt.sign(
          { email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        token = { accessToken };
      }
      return { ...token, ...user };
      // This returned value is a new 'user' object
      // It contains the user data in the previous user object e.g. email, but we also add the JWT
      // It is passed as 'token' to the 'session' callback
    },

    // Add the user's JWT to the session
    async session({ session, token }) {
      // We update the session's user object with the passed in user object 'token', that contains the JWT
      // The session object can be accessed in the client side with the useSession hook
      session.user = token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
