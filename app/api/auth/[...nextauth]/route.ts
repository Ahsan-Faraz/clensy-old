import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import connectToDatabase from "@/lib/db/mongodb";
import User from "@/models/User";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // First check credentials without DB connection for faster response
          if (
            credentials?.email === "admin@clensy.com" && 
            credentials?.password === "admin123"
          ) {
            try {
              // Try to connect to MongoDB with timeout
              const dbPromise = connectToDatabase();
              const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('DB timeout')), 5000)
              );

              await Promise.race([dbPromise, timeoutPromise]);

              // Check if user exists in DB, if not create them
              let user = await User.findOne({ email: credentials.email });
              
              if (!user) {
                user = await User.create({
                  email: credentials.email,
                  name: "Admin",
                  role: "admin",
                });
              }

              return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
              };
            } catch (dbError) {
              console.error("Database error, using fallback auth:", dbError);
              // Fallback: return user without DB interaction
              return {
                id: "admin-fallback",
                name: "Admin",
                email: credentials.email,
                role: "admin",
              };
            }
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/protected",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };