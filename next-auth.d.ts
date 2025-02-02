import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
	interface Session extends DefaultSession {
		accessToken?: string;
		user: {
			/** Nom de l'utilisateur tel que récupéré sur GitHub (login) */
			login?: string;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		accessToken?: string;
		githubLogin?: string;
	}
}
