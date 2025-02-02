"use client";
import React from "react";
import { Button, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface PortfolioProps {
	name: string;
	description: string;
	biography: string;
	projects: { title: string; description: string; link: string }[];
	contact: { email: string; phone: string; linkedin: string };
	theme: {
		primaryColor: string;
		secondaryColor: string;
		backgroundColor: string;
		textColor: string;
	};
}

const Portfolio: React.FC<PortfolioProps> = ({
	name,
	description,
	biography,
	projects,
	contact,
	theme,
}) => {
	// Récupérer les couleurs depuis les props
	const { primaryColor, secondaryColor, backgroundColor, textColor } = theme;

	return (
		<div className="min-h-screen" style={{ backgroundColor }}>
			{/* HEADER */}
			<header
				className="bg-white shadow"
				style={{ borderBottom: `2px solid ${primaryColor}` }}
			>
				<div className="container mx-auto px-6 py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold" style={{ color: textColor }}>
						{name}
					</h1>
					<nav>
						<ul className="flex space-x-6">
							<li>
								<a
									href="#welcome"
									className="hover:underline"
									style={{ color: textColor }}
								>
									Accueil
								</a>
							</li>
							<li>
								<a
									href="#projects"
									className="hover:underline"
									style={{ color: textColor }}
								>
									Projets
								</a>
							</li>
							<li>
								<a
									href="#about"
									className="hover:underline"
									style={{ color: textColor }}
								>
									À propos
								</a>
							</li>
							<li>
								<a
									href="#contact"
									className="hover:underline"
									style={{ color: textColor }}
								>
									Contact
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{/* CONTENU PRINCIPAL */}
			<main className="container mx-auto px-6 py-10">
				{/* SECTION ACCUEIL */}
				<section id="welcome" className="mb-16 text-center">
					<h2 className="text-4xl font-bold mb-4" style={{ color: primaryColor }}>
						Bienvenue sur mon Portfolio
					</h2>
					<p className="text-xl mb-6" style={{ color: textColor }}>
						{description}
					</p>
					<Button
						color="primary"
						size="lg"
						endContent={<Icon icon="akar-icons:arrow-right" />}
						as={Link}
						href="#projects"
					>
						Découvrir mes projets
					</Button>
				</section>

				{/* SECTION PROJETS */}
				<section id="projects" className="mb-16">
					<h2 className="text-3xl font-bold mb-8" style={{ color: primaryColor }}>
						Mes Projets
					</h2>
					<div className="grid gap-8 md:grid-cols-2">
						{projects.map((project, index) => (
							<Card
								key={index}
								className="p-6 hover:shadow-lg transition-shadow"
								style={{ borderColor: secondaryColor }}
							>
								<h3
									className="text-2xl font-semibold mb-2"
									style={{ color: textColor }}
								>
									{project.title}
								</h3>
								<p className="mb-4" style={{ color: textColor }}>
									{project.description}
								</p>
								<Button
									as="a"
									href={project.link}
									target="_blank"
									color="secondary"
									size="sm"
								>
									Voir le projet
								</Button>
							</Card>
						))}
					</div>
				</section>

				{/* SECTION À PROPOS */}
				<section id="about" className="mb-16">
					<h2 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>
						À Propos
					</h2>
					<p className="text-lg" style={{ color: textColor }}>
						{biography}
					</p>
				</section>

				{/* SECTION CONTACT */}
				<section id="contact" className="mb-16">
					<h2 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>
						Contact
					</h2>
					<div className="space-y-4">
						<p style={{ color: textColor }}>
							Email :{" "}
							<a
								href={`mailto:${contact.email}`}
								className="underline hover:text-indigo-600"
								style={{ color: secondaryColor }}
							>
								{contact.email}
							</a>
						</p>
						<p style={{ color: textColor }}>
							Téléphone :{" "}
							<a
								href={`tel:${contact.phone}`}
								className="underline hover:text-indigo-600"
								style={{ color: secondaryColor }}
							>
								{contact.phone}
							</a>
						</p>
						<p style={{ color: textColor }}>
							LinkedIn :{" "}
							<a
								href={contact.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="underline hover:text-indigo-600"
								style={{ color: secondaryColor }}
							>
								{contact.linkedin}
							</a>
						</p>
					</div>
				</section>
			</main>

			{/* FOOTER */}
			<footer
				className="bg-white shadow mt-12"
				style={{ borderTop: `2px solid ${primaryColor}` }}
			>
				<div
					className="container mx-auto px-6 py-4 text-center"
					style={{ color: textColor }}
				>
					&copy; {new Date().getFullYear()} {name}. Tous droits réservés.
				</div>
			</footer>
		</div>
	);
};

export default Portfolio;
