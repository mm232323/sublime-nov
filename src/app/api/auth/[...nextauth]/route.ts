import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const userRes = await fetch("http://localhost:5800/auth/get-user", {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const user = JSON.parse(await userRes.json());
          const checkUser = await fetch(
            "http://localhost:5800/auth/check-user",
            {
              method: "POST",
              body: JSON.stringify({ email }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const exist = JSON.parse(await checkUser.json()) as unknown as {
            isExist: boolean;
          };
          if (!exist.isExist || user.password !== password) return null;
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
