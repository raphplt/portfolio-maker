/* eslint-disable @typescript-eslint/no-explicit-any */
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { UserInterface } from "@/type/user";

export const authOptions : any  = {
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
			user: any;
			account: any | null;
			profile?: GithubProfile;
		}) {
			if (
				account &&
				(account.provider === "github" || account.provider === "google")
			) {
				try {
					const checkUserRes = await fetch(
						`${process.env.NEXT_PUBLIC_NEST_API_URL}/users/email/${user.email}`,
						{
							method: "GET",
							headers: { "Content-Type": "application/json" },
						}
					);

					if (checkUserRes.ok) {
						console.log("L'utilisateur existe déjà");
						return true;
					}
				} catch (error) {
					console.error("Erreur lors de la vérification de l'utilisateur :", error);
					return false;
				}

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
					const res = await fetch(
						`${process.env.NEXT_PUBLIC_NEST_API_URL}/auth/register`,
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(userData),
						}
					);

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
			user?: any;
			account?: any;
		}) {
			if (account) {
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
			} else if (user && user.accessToken) {
				token.accessToken = user.accessToken;
			}

			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_NEST_API_URL}/users/email/${token.email}`,
					{
						method: "GET",
						headers: { "Content-Type": "application/json" },
					}
				);
				if (res.ok) {
					const dbUser = await res.json();
					token.user = dbUser;
				}
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des infos utilisateur :",
					error
				);
			}
			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			session.accessToken = token.accessToken as string;
			session.user = token.user as UserInterface;
			session.refreshToken = token.refreshToken as string;
			return session;
		},
	},
	session: {
		strategy: "jwt" as any,
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/auth/signin",
		signUp: "/auth/signup",
		signOut: "/auth/signout",
		error: "/auth/error",
	},
};