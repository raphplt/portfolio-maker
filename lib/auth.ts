/* eslint-disable @typescript-eslint/no-explicit-any */
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { UserInterface } from "@/type/user";

function generateRandomPassword(length: number = 12): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export const authOptions: any = {
  providers: [
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET || "",
      authorization: {
        params: { scope: "read:user user:email public_repo" },
      },
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
      // Pour les providers sociaux, on va utiliser l’endpoint d’inscription pour récupérer le JWT backend
      if (account && (account.provider === "github" || account.provider === "google")) {
        try {
          // Vérifier si l'utilisateur existe déjà dans le backend
          const checkUserRes = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API_URL}/users/email/${user.email}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!checkUserRes.ok) {
            // L'utilisateur n'existe pas, on le crée avec un mot de passe aléatoire
            const nameParts = user.name ? user.name.split(" ") : [];
            const firstName = nameParts[0] || "";
            const lastName = nameParts.slice(1).join(" ") || "";
            const generatedPassword = generateRandomPassword();

            const userData: Partial<UserInterface> = {
              email: user.email ?? "",
              firstName,
              lastName,
              password: generatedPassword,
              avatar: user.image ?? "",
            };

            if (account.provider === "github" && profile?.login) {
              userData.githubUsername = profile.login;
            }

            const registerRes = await fetch(
              `${process.env.NEXT_PUBLIC_NEST_API_URL}/auth/register`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
              }
            );

            if (registerRes.ok) {
              const registerData = await registerRes.json();
              // Ici, on récupère le JWT backend et on le stocke dans l'objet user
              user.accessToken = registerData.access_token;
            } else {
              console.error(
                "Erreur lors de la création de l'utilisateur :",
                await registerRes.text()
              );
              return false;
            }
        } else {
			// L'utilisateur existe déjà, nous récupérons le JWT via l'endpoint dédié
			try {
			  const socialRes = await fetch(
				`${process.env.NEXT_PUBLIC_NEST_API_URL}/auth/social-login`,
				{
				  method: "POST",
				  headers: { "Content-Type": "application/json" },
				  body: JSON.stringify({ email: user.email, provider: account.provider }),
				}
			  );
			  if (socialRes.ok) {
				const socialData = await socialRes.json();
				user.accessToken = socialData.access_token;
			  } else {
				console.error("Erreur lors de la récupération du JWT via social login", await socialRes.text());
				return false;
			  }
			} catch (error) {
			  console.error("Erreur lors de la récupération du JWT via social login:", error);
			  return false;
			}
		  }
		  
        } catch (error) {
          console.error("Erreur lors de la vérification de l'utilisateur :", error);
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
      // Pour le provider credentials, on utilise le token renvoyé par le backend
      if (account && account.provider === "credentials") {
        token.accessToken = account.access_token;
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
	