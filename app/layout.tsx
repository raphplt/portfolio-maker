import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Layout/Header";
import NextAuthProvider from "@/components/Sessions/NextAuthProvider";
import Footer from "@/components/Layout/Footer";

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
			<html lang="fr">
				<body className={`antialiased`}>
					<Header />
					{children}
					<Footer />
				</body>
			</html>
		</NextAuthProvider>
	);
}
