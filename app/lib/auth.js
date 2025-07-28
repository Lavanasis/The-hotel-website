import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { createGuest, fetchGuest, fetchGuestByEmail } from "./FetchData";

const authConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      //用于判断某个请求是否有权限通过
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existGuest = await fetchGuestByEmail(user.email);
        if(!existGuest){
          await createGuest({email:user.email,fullName:user.name})
        }
        return true;
      } catch (err) {
        console.error("Error during signIn:", err);
        return false;
      }
    },

    async session({ session, user }) {
      const guests = await fetchGuest(); 
      const guest = guests.find((g) => g.email === session.user.email);
      if (guest) {
        session.user.guestId = guest.documentId;
      } 
      return session;;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);