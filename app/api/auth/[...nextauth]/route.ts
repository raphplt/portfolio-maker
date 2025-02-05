/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

console.log("GITHUB_CLIENT_ID:", process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID);
console.log(
	"GITHUB_CLIENT_SECRET:",
	process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET
);


const authOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "",
			clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET || "",
			profile(profile) {
				return {
					id: profile.id.toString(),
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
					login: profile.login,
				};
			},
		}),
	],
	callbacks: {
		async jwt({
			token,
			account,
			profile,
		}: {
			token: JWT;
			account: any;
			profile?: any;
		}) {
			if (account) {
				token.accessToken = account.access_token;
				token.githubLogin = profile?.login;
			}
			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			session.accessToken = token.accessToken as string;
			session.user.login = token.githubLogin as string;

			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
