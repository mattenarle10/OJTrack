// src/services/auth.tsx
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma"; // Your Prisma instance

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,  // Type assertion
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,  // Type assertion
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // You can use JWT or database session
  },
  callbacks: {
    async session({ session, user }) {
      // You can also store additional user info here
      session.user.id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
