import prisma from "@/lib/db";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}
async function getUserFromDatabase(username: string) {
  const user = prisma.user.findUnique({
    where: {
      user_name: username
    }
  })
  return user;
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      authorize: async (credential) => {
        try {
          let user = null
          const { email, password } = credential as { email: string; password: string }
          user = await getUserFromDatabase(email)
          console.log(user)
          // 判断密码是否相同，目前密码没有加密
          if (user?.user_pass === password) {

            return {
              id: user?.ID?.toString(), // 将number转换为string
              name: user?.user_name,
              email: user?.user_email,
            }
          }
          else {
            throw new InvalidLoginError()
          }
        } catch (error) {
          console.log(error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/user/login',
    
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized: async ({ auth }) => {

      console.log(auth)
      return !!auth
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

