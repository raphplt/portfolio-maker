import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const authOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
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
		async jwt({ token, account, profile }) {
			if (account) {
				token.accessToken = account.access_token;
				token.githubLogin = profile?.login;
			}
			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken as string;
			session.user.login = token.githubLogin as string;

			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
