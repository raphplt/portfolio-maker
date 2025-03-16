"use client";
import { Link } from "@heroui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
	const pathname = usePathname();

	if (pathname.startsWith("/portfolios") || pathname.startsWith("/auth")) {
		return null;
	}

	return (
		<footer className="bg-gray-950  py-12 px-8 text-white">
			<div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
				<div className="col-span-1">
					<Link href="/" className="flex items-center gap-4">
						<Image src={"/Logo.png"} alt="Logo" width={32} height={32} />
						<span className="font-bold text-lg">Penfolio</span>
					</Link>
					<p className="mt-4 text-default-200">
						Créez un portfolio professionnel en quelques minutes, sans effort.
					</p>
				</div>
				<div className="col-span-1">
					<h3 className="font-bold text-lg">Liens rapides</h3>
					<ul className="mt-4 space-y-2">
						<li>
							<Link href="/" className="text-default-300">
								Accueil
							</Link>
						</li>
						<li>
							<Link href="/portfolios/new" className="text-default-300">
								Nouveau portfolio
							</Link>
						</li>
						<li>
							<Link href="/about" className="text-default-300">
								À propos
							</Link>
						</li>
						<li>
							<Link href="/contact" className="text-default-300">
								Contact
							</Link>
						</li>
					</ul>
				</div>
				<div className="col-span-1">
					<h3 className="font-bold text-lg">Ressources</h3>
					<ul className="mt-4 space-y-2">
						<li>
							<Link href="/blog" className="text-default-300">
								Blog
							</Link>
						</li>
						<li>
							<Link href="/help" className="text-default-300">
								Aide
							</Link>
						</li>
						<li>
							<Link href="/privacy" className="text-default-300">
								Politique de confidentialité
							</Link>
						</li>
						<li>
							<Link href="/terms" className="text-default-300">
								Conditions d&apos;utilisation
							</Link>
						</li>
					</ul>
				</div>
				<div className="col-span-1">
					<h3 className="font-bold text-lg">Suivez-nous</h3>
					<ul className="mt-4 space-y-2">
						<li>
							<Link href="https://facebook.com" className="text-default-300">
								Facebook
							</Link>
						</li>
						<li>
							<Link href="https://twitter.com" className="text-default-300">
								Twitter
							</Link>
						</li>
						<li>
							<Link href="https://linkedin.com" className="text-default-300">
								LinkedIn
							</Link>
						</li>
						<li>
							<Link href="https://instagram.com" className="text-default-300">
								Instagram
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="mt-12 text-center text-default-300">
				&copy; {new Date().getFullYear()} Penfolio. Tous droits réservés.
			</div>
		</footer>
	);
};

export default Footer;
