import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
			// Personnaliser le profil pour inclure le login (nom d'utilisateur)
			profile(profile) {
				return {
					id: profile.id.toString(),
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
					// Ajout du login GitHub
					login: profile.login,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, profile }) {
			// Sauvegarde de l'access token dans le JWT
			if (account) {
				token.accessToken = account.access_token;
				// On sauvegarde également le login (si présent dans le profil)
				token.githubLogin = profile?.login;
			}
			return token;
		},
		async session({ session, token }) {
			// Ajout de l'access token à la session
			session.accessToken = token.accessToken as string;
			// On peut aussi ajouter le login à l'objet user de la session
			session.user.login = token.githubLogin as string;
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
