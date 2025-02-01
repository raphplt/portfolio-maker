"use client";
import React from "react";
import { Button, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Portfolio = () => {
	// VARIABLES DE THÈME (modifiable)
	const theme = {
		primaryColor: "#4F46E5", // Couleur principale (Indigo-600)
		secondaryColor: "#10B981", // Couleur secondaire (Emerald-500)
		backgroundColor: "#F3F4F6", // Fond de page (Gray-100)
		textColor: "#1F2937", // Couleur de texte (Gray-800)
	};

	// VARIABLES DE CONTENU (modifiable)
	const name = "John Doe";
	const description = "Développeur Fullstack / UX-UI Designer / Créatif";
	const biography =
		"Passionné par la technologie et le design, je mets en œuvre mon savoir-faire pour réaliser des projets innovants et esthétiques. Découvrez ici quelques-unes de mes réalisations.";
	const projects = [
		{
			title: "Projet Alpha",
			description: "Une application web moderne avec React et Node.js.",
			link: "https://github.com/johndoe/projet-alpha",
		},
		{
			title: "Projet Beta",
			description:
				"Une interface utilisateur intuitive conçue avec Figma et Tailwind.",
			link: "https://github.com/johndoe/projet-beta",
		},
		{
			title: "Projet Gamma",
			description:
				"Un projet innovant qui intègre l'IA pour améliorer l'expérience utilisateur.",
			link: "https://github.com/johndoe/projet-gamma",
		},
	];
	const contact = {
		email: "contact@johndoe.com",
		phone: "+33 1 23 45 67 89",
		linkedin: "https://www.linkedin.com/in/johndoe",
	};

	return (
		<div
			className="min-h-screen"
			style={{ backgroundColor: theme.backgroundColor }}
		>
			{/* HEADER */}
			<header
				className="bg-white shadow"
				style={{ borderBottom: `2px solid ${theme.primaryColor}` }}
			>
				<div className="container mx-auto px-6 py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold" style={{ color: theme.textColor }}>
						{name}
					</h1>
					<nav>
						<ul className="flex space-x-6">
							<li>
								<a
									href="#welcome"
									className="hover:underline"
									style={{ color: theme.textColor }}
								>
									Accueil
								</a>
							</li>
							<li>
								<a
									href="#projects"
									className="hover:underline"
									style={{ color: theme.textColor }}
								>
									Projets
								</a>
							</li>
							<li>
								<a
									href="#about"
									className="hover:underline"
									style={{ color: theme.textColor }}
								>
									À propos
								</a>
							</li>
							<li>
								<a
									href="#contact"
									className="hover:underline"
									style={{ color: theme.textColor }}
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
					<h2
						className="text-4xl font-bold mb-4"
						style={{ color: theme.primaryColor }}
					>
						Bienvenue sur mon Portfolio
					</h2>
					<p className="text-xl mb-6" style={{ color: theme.textColor }}>
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
					<h2
						className="text-3xl font-bold mb-8"
						style={{ color: theme.primaryColor }}
					>
						Mes Projets
					</h2>
					<div className="grid gap-8 md:grid-cols-2">
						{projects.map((project, index) => (
							<Card
								key={index}
								className="p-6 hover:shadow-lg transition-shadow"
								style={{ borderColor: theme.secondaryColor }}
							>
								<h3
									className="text-2xl font-semibold mb-2"
									style={{ color: theme.textColor }}
								>
									{project.title}
								</h3>
								<p className="mb-4" style={{ color: theme.textColor }}>
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
					<h2
						className="text-3xl font-bold mb-4"
						style={{ color: theme.primaryColor }}
					>
						À Propos
					</h2>
					<p className="text-lg" style={{ color: theme.textColor }}>
						{biography}
					</p>
				</section>

				{/* SECTION CONTACT */}
				<section id="contact" className="mb-16">
					<h2
						className="text-3xl font-bold mb-4"
						style={{ color: theme.primaryColor }}
					>
						Contact
					</h2>
					<div className="space-y-4">
						<p style={{ color: theme.textColor }}>
							Email :{" "}
							<a
								href={`mailto:${contact.email}`}
								className="underline hover:text-indigo-600"
								style={{ color: theme.secondaryColor }}
							>
								{contact.email}
							</a>
						</p>
						<p style={{ color: theme.textColor }}>
							Téléphone :{" "}
							<a
								href={`tel:${contact.phone}`}
								className="underline hover:text-indigo-600"
								style={{ color: theme.secondaryColor }}
							>
								{contact.phone}
							</a>
						</p>
						<p style={{ color: theme.textColor }}>
							LinkedIn :{" "}
							<a
								href={contact.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="underline hover:text-indigo-600"
								style={{ color: theme.secondaryColor }}
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
				style={{ borderTop: `2px solid ${theme.primaryColor}` }}
			>
				<div
					className="container mx-auto px-6 py-4 text-center"
					style={{ color: theme.textColor }}
				>
					&copy; {new Date().getFullYear()} {name}. Tous droits réservés.
				</div>
			</footer>
		</div>
	);
};

export default Portfolio;
