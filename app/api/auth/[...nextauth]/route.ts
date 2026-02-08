import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const fakeUser = {
          id: "1",
          name: "admin",
          passwordHash: bcrypt.hashSync("123456", 10),
        };

        const isValid = await bcrypt.compare(
          credentials.password,
          fakeUser.passwordHash
        );

        if (!isValid || credentials.username !== fakeUser.name) return null;

        return { id: fakeUser.id, name: fakeUser.name };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
