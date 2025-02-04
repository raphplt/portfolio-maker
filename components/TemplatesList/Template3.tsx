"use client";
import React from "react";
import { Button, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface PortfolioProps {
	name: string;
	description: string;
	biography: string;
	welcomeTitle: string;
	ctaButtonText: string;
	projectsTitle: string;
	aboutTitle: string;
	contactTitle: string;
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
	welcomeTitle,
	ctaButtonText,
	projectsTitle,
	aboutTitle,
	contactTitle,
	projects,
	contact,
	theme,
}) => {
	const { primaryColor, secondaryColor, backgroundColor, textColor } = theme;

	// Style de base pour un effet Neumorphism
	const neumorphicStyle = {
		background: backgroundColor,
		borderRadius: "20px",
		boxShadow:
			"8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.7)",
	};

	return (
		<div className="font-sans" style={{ backgroundColor }}>
			{/* Header – barre de navigation fixe en Neumorphism subtil */}
			<header
				className="fixed top-0 left-0 right-0 z-50 p-4"
				style={{
					background: backgroundColor,
					boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
				}}
			>
				<div className="container mx-auto flex justify-between items-center">
					<h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
						{name}
					</h1>
					<nav>
						<ul className="flex space-x-6">
							<li>
								<a
									href="#hero"
									className="hover:text-gray-600 transition-colors"
									style={{ color: textColor }}
								>
									Accueil
								</a>
							</li>
							<li>
								<a
									href="#projects"
									className="hover:text-gray-600 transition-colors"
									style={{ color: textColor }}
								>
									{projectsTitle}
								</a>
							</li>
							<li>
								<a
									href="#about"
									className="hover:text-gray-600 transition-colors"
									style={{ color: textColor }}
								>
									{aboutTitle}
								</a>
							</li>
							<li>
								<a
									href="#contact"
									className="hover:text-gray-600 transition-colors"
									style={{ color: textColor }}
								>
									{contactTitle}
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{/* Section Hero – Présentation dans une carte Neumorphique */}
			<section
				id="hero"
				className="pt-24 pb-16 flex items-center justify-center text-center"
			>
				<div className="container mx-auto px-6" style={neumorphicStyle}>
					<div className="p-10">
						<h2
							className="text-5xl md:text-6xl font-extrabold mb-4"
							style={{ color: primaryColor }}
						>
							{welcomeTitle}
						</h2>
						<p className="text-xl md:text-2xl mb-8" style={{ color: textColor }}>
							{description}
						</p>
						<Button
							color="primary"
							size="lg"
							as={Link}
							href="#projects"
							className="px-8 py-4 text-lg font-semibold rounded-full"
							style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
						>
							{ctaButtonText}
							<span className="ml-2">
								<Icon icon="akar-icons:arrow-right" />
							</span>
						</Button>
					</div>
				</div>
			</section>

			{/* Section Projets – Grille de cartes Neumorphiques */}
			<section id="projects" className="py-20">
				<div className="container mx-auto px-6">
					<h2
						className="text-4xl font-bold text-center mb-12"
						style={{ color: primaryColor }}
					>
						{projectsTitle}
					</h2>
					{projects.length > 0 ? (
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{projects.map((project, index) => (
								<Card
									key={index}
									className="p-6 rounded-lg transition-all"
									style={{
										...neumorphicStyle,
										border: `1px solid ${secondaryColor}`,
									}}
								>
									<h3
										className="text-2xl font-semibold mb-4"
										style={{ color: primaryColor }}
									>
										{project.title}
									</h3>
									<p className="mb-6" style={{ color: textColor }}>
										{project.description}
									</p>
									<Button
										as="a"
										href={project.link}
										target="_blank"
										color="secondary"
										size="sm"
										className="rounded-full"
										style={{
											backgroundColor: secondaryColor,
											borderColor: secondaryColor,
										}}
									>
										Voir le projet
									</Button>
								</Card>
							))}
						</div>
					) : (
						<p className="text-center text-xl" style={{ color: textColor }}>
							Aucun projet à afficher pour le moment.
						</p>
					)}
				</div>
			</section>

			{/* Section À propos – Texte dans une carte Neumorphique */}
			<section id="about" className="py-20">
				<div className="container mx-auto px-6">
					<h2
						className="text-4xl font-bold text-center mb-12"
						style={{ color: primaryColor }}
					>
						{aboutTitle}
					</h2>
					<div className="max-w-3xl mx-auto text-center p-8" style={neumorphicStyle}>
						<p className="text-lg leading-relaxed" style={{ color: textColor }}>
							{biography}
						</p>
					</div>
				</div>
			</section>

			{/* Section Contact – Coordonnées présentées dans une carte Neumorphique */}
			<section id="contact" className="py-20">
				<div className="container mx-auto px-6">
					<h2
						className="text-4xl font-bold text-center mb-12"
						style={{ color: primaryColor }}
					>
						{contactTitle}
					</h2>
					<div className="max-w-xl mx-auto" style={neumorphicStyle}>
						<div className="p-8">
							<div className="space-y-6">
								<div className="flex items-center">
									<Icon
										icon="mdi:email"
										className="text-2xl mr-4"
										style={{ color: secondaryColor }}
									/>
									<a
										href={`mailto:${contact.email}`}
										className="text-lg hover:underline"
										style={{ color: textColor }}
									>
										{contact.email}
									</a>
								</div>
								<div className="flex items-center">
									<Icon
										icon="mdi:phone"
										className="text-2xl mr-4"
										style={{ color: secondaryColor }}
									/>
									<a
										href={`tel:${contact.phone}`}
										className="text-lg hover:underline"
										style={{ color: textColor }}
									>
										{contact.phone}
									</a>
								</div>
								<div className="flex items-center">
									<Icon
										icon="mdi:linkedin"
										className="text-2xl mr-4"
										style={{ color: secondaryColor }}
									/>
									<a
										href={contact.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="text-lg hover:underline"
										style={{ color: textColor }}
									>
										LinkedIn
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer
				className="py-6"
				style={{
					background: backgroundColor,
					boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
				}}
			>
				<div className="container mx-auto px-6 text-center">
					<p className="text-lg" style={{ color: textColor }}>
						&copy; {new Date().getFullYear()} {name}. Tous droits réservés.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Portfolio;
