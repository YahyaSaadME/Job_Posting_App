import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import dbConnect from "./dbConnect";

declare module "next-auth" {
  interface User {
    id: string;
    type: string;
  }

  interface Session {
    user: {
      id: string;
      type?: string;
      email: string;
      name?: string;
    };
  }

  interface JWT {
    id: string;
    type: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "sign-in",
      name: "Sign In",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await dbConnect();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        if (!user.password) {
          throw new Error("User password is not set");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password !!");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          type: user.type, 
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
        token.type = user.type; 
      }
      return token; // Ensure token is always returned
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; 
        session.user.type = token.type as string; 
      }
      return session;
    },
   
  },
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
