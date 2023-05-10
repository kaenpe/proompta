import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

import { connectToDB } from "@utils/database";
const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	async session({ session }) {
		try {
			await connectToDB();

			return true;
		} catch (error) {}
	},
	async signIn({ profile }) {
		try {
		} catch (error) {}
	},
});

export { handler as GET, handler as POST };
