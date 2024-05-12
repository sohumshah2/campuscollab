import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/prisma";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

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
  },
});

export { handler as GET, handler as POST };
