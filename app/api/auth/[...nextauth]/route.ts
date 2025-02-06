import NextAuth, { Account, Profile, SessionStrategy, User } from "next-auth";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { UserInterface } from "@/type/user";

export const authOptions = {
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
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "email@example.com" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
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

					if (res.ok && user && user.access_token) {
						return { ...user, accessToken: user.access_token };
					} else {
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
		async signIn({
			user,
			account,
			profile,
		}: {
			user: User;
			account: Account;
			profile: GithubProfile;
		}) {
			if (account.provider === "github" || account.provider === "google") {
				try {
					// Vérifier si l'utilisateur existe déjà dans la base de données
					const checkUserRes = await fetch(
						`${process.env.NEXT_PUBLIC_NEST_API_URL}/users/email/${user.email}`,
						{
							method: "GET",
							headers: { "Content-Type": "application/json" },
						}
					);

					console.log("user.email", user.email);

					console.log('checkUserRes', checkUserRes.status);

					if (checkUserRes.ok) {
						console.log("L'utilisateur existe déjà");
						return true; // L'utilisateur existe déjà, on autorise la connexion
					}
				} catch (error) {
					console.error("Erreur lors de la vérification de l'utilisateur :", error);
					return false; // Problème de vérification, on refuse la connexion
				}

				// Création de l'utilisateur s'il n'existe pas
				const nameParts = user.name ? user.name.split(" ") : [];
				const firstName = nameParts[0] || "";
				const lastName = nameParts.slice(1).join(" ") || "";

				function generateRandomPassword(length: number = 12): string {
					const chars =
						"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
					let password = "";
					for (let i = 0; i < length; i++) {
						password += chars.charAt(Math.floor(Math.random() * chars.length));
					}
					return password;
				}

				const userData: Partial<UserInterface> = {
					email: user.email ?? "",
					firstName,
					lastName,
					password: generateRandomPassword(),
				};

				if (account.provider === "github" && profile?.login) {
					userData.githubUsername = profile.login;
				}

				try {
					const res = await fetch(`${process.env.NEXT_PUBLIC_NEST_API_URL}/users`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(userData),
					});

					if (!res.ok) {
						console.error(
							"Erreur lors de la création de l'utilisateur :",
							await res.text()
						);
						return false;
					}
				} catch (error) {
					console.error("Erreur lors de l'appel à l'API backend :", error);
					return false;
				}
			}
			return true;
		},
		async jwt({
			token,
			user,
			account,
		}: {
			token: JWT;
			user: User;
			account: Account;
		}) {
			if (user || account) {
				try {
					// Récupérer les informations complètes depuis la base de données après connexion
					const res = await fetch(
						`${process.env.NEXT_PUBLIC_NEST_API_URL}/users/email/${token.email}`,
						{
							method: "GET",
							headers: { "Content-Type": "application/json" },
						}
					);

					if (res.ok) {
						const dbUser = await res.json();
						token.user = dbUser; // Stocker les infos de l'utilisateur en base de données
					}
				} catch (error) {
					console.error(
						"Erreur lors de la récupération des infos utilisateur :",
						error
					);
				}
			}
			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			session.accessToken = token.accessToken as string;
			session.user = token.user as UserInterface; // Utilisation des infos venant de la BDD
			return session;
		},
	},
	session: {
		strategy: "jwt" as SessionStrategy,
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
