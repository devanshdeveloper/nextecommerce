import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../../../lib/prismaClient";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: "ecommerce-site",
  callbacks: {
    session: async function (session) {
      if (!session) return;
      return {
        user: {
          ...session.user,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
