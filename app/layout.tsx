import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Layout/Header";
import NextAuthProvider from "@/components/Sessions/NextAuthProvider";
import Footer from "@/components/Layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import Seo from "@/components/Shared/Seo";
import { SessionProvider } from "@/Contexts/SessionProvider";

export const metadata: Metadata = {
	title: "Portfolio Maker",
	description: "Créez votre portfolio en quelques minutes",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<NextAuthProvider>
			<SessionProvider>
				<html lang="fr">
					<Seo />
					<body className={`antialiased`}>
						<Header />
						{children}
						<Footer />
						<Analytics />
					</body>
				</html>
			</SessionProvider>
		</NextAuthProvider>
	);
}