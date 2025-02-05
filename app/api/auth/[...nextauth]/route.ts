import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const authOptions = {
	providers: [
		// Provider GitHub existant
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
		// Provider Credentials pour l'auth local via ton API NestJS
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "email@example.com" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				try {
					console.log(
						"Tentative d'authentification avec les identifiants :",
						credentials
					);

					// Appel à l'API NestJS pour vérifier les identifiants
					const res = await fetch(
						`${process.env.NEXT_PUBLIC_NEST_API_URL}/auth/login`,
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								email: credentials?.email,
								password: credentials?.password,
							}),
						}
					);

					const user = await res.json();
					console.log("Réponse de l'API :", user);

					if (res.ok && user && user.access_token) {
						console.log("Authentification réussie pour l'utilisateur :", user);
						return { ...user, accessToken: user.access_token };
					} else {
						console.log(
							"Échec de l'authentification : réponse non valide ou token manquant"
						);
						return null;
					}
				} catch (error) {
					console.error("Erreur d'authentification :", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, account, profile }) {
			if (user) {
				token.accessToken = user.accessToken || account?.access_token;
				token.email = user.email || profile?.email;
				token.user = user.user || {};
			}
			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			session.accessToken = token.accessToken as string;
			session.user.email = token.email as string;
			session.user = { ...session.user, ...token.user };
			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
