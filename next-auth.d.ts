import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
	interface Session extends DefaultSession {
		accessToken?: string;
		user: {
			firstName?: string;
			avatar?: string;
			login?: string;
			accessToken?: string;
			refreshToken?: string;
			githubUsername?: string;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		accessToken?: string;
		githubLogin?: string;
	}
}
