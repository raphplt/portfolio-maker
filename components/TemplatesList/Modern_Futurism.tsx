"use client";
import React from "react";
import { Button, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { TemplateData } from "@/app/portfolios/new/[id]/helper";

const Portfolio: React.FC<TemplateData> = ({
	informations: { name, welcomeTitle, description, biography, ctaButtonText },
	sections: {
		projects: { title: projectsTitle },
		about: { title: aboutTitle },
		contact: { title: contactTitle },
	},
	projects,
	contact,
	theme,
}: TemplateData) => {
	const { primaryColor, secondaryColor, backgroundColor, textColor } = theme;

	return (
		<div className="font-sans" style={{ backgroundColor, color: textColor }}>
			{/* Header – Navigation fixe avec effet néon */}
			<header
				className="fixed top-0 left-0 right-0 z-50 py-4"
				style={{
					backgroundColor: "#0D0D0D",
					boxShadow: "0 2px 10px rgba(0,0,0,0.7)",
				}}
			>
				<div className="container mx-auto px-6 flex justify-between items-center">
					<h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
						{name}
					</h1>
					<nav>
						<ul className="flex space-x-6">
							<li>
								<a
									href="#hero"
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
									{projectsTitle}
								</a>
							</li>
							<li>
								<a
									href="#about"
									className="hover:underline"
									style={{ color: textColor }}
								>
									{aboutTitle}
								</a>
							</li>
							<li>
								<a
									href="#contact"
									className="hover:underline"
									style={{ color: textColor }}
								>
									{contactTitle}
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{/* Section Hero – Fond en gradient néon, texte avec effet glow */}
			<section
				id="hero"
				className="pt-28 pb-20 flex flex-col items-center justify-center text-center"
				style={{
					background: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
				}}
			>
				<div className="container mx-auto px-6">
					<h2
						className="text-6xl md:text-7xl font-extrabold mb-6 neon-text"
						style={{
							textShadow: `0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}`,
							color: "#fff",
						}}
					>
						{welcomeTitle}
					</h2>
					<p
						className="text-2xl md:text-3xl mb-8"
						style={{ color: "#fff", textShadow: "0 0 8px rgba(255,255,255,0.7)" }}
					>
						{description}
					</p>
					<Button
						color="primary"
						size="lg"
						as={Link}
						href="#projects"
						className="px-8 py-4 text-xl font-semibold rounded-full neon-button hover:scale-105 transition-transform"
						style={{
							backgroundColor: secondaryColor,
							borderColor: secondaryColor,
						}}
					>
						{ctaButtonText}
						<span className="ml-2">
							<Icon icon="akar-icons:arrow-right" />
						</span>
					</Button>
				</div>
			</section>

			{/* Section Projets – Cartes avec effet de survol et bordures néon */}
			<section
				id="projects"
				className="py-20"
				style={{ backgroundColor: "#141414" }}
			>
				<div className="container mx-auto px-6">
					<h2
						className="text-5xl font-bold text-center mb-12"
						style={{ color: primaryColor }}
					>
						{projectsTitle}
					</h2>
					{projects.length > 0 ? (
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{projects.map((project, index) => (
								<Card
									key={index}
									className="p-8 rounded-lg transition-transform transform hover:scale-105"
									style={{
										backgroundColor: "#1f1f1f",
										border: `2px solid ${secondaryColor}`,
									}}
								>
									<h3
										className="text-2xl font-semibold mb-4"
										style={{ color: primaryColor }}
									>
										{project.title}
									</h3>
									<p className="mb-6" style={{ color: "#ccc" }}>
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
						<p className="text-center text-xl" style={{ color: "#ccc" }}>
							Aucun projet à afficher pour le moment.
						</p>
					)}
				</div>
			</section>

			{/* Section À propos – Texte présenté sur fond sombre avec contraste */}
			<section id="about" className="py-20" style={{ backgroundColor: "#0D0D0D" }}>
				<div className="container mx-auto px-6">
					<h2
						className="text-5xl font-bold text-center mb-12"
						style={{ color: primaryColor }}
					>
						{aboutTitle}
					</h2>
					<div className="max-w-3xl mx-auto text-center">
						<p className="text-xl leading-relaxed" style={{ color: "#ccc" }}>
							{biography}
						</p>
					</div>
				</div>
			</section>

			{/* Section Contact – Coordonnées dans une carte avec accents néon */}
			<section
				id="contact"
				className="py-20"
				style={{ backgroundColor: "#141414" }}
			>
				<div className="container mx-auto px-6">
					<h2
						className="text-5xl font-bold text-center mb-12"
						style={{ color: primaryColor }}
					>
						{contactTitle}
					</h2>
					<div className="max-w-xl mx-auto bg-[#1f1f1f] p-8 rounded-lg shadow-lg">
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
									style={{ color: "#ccc" }}
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
									style={{ color: "#ccc" }}
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
									style={{ color: "#ccc" }}
								>
									LinkedIn
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Footer – Simple et épuré */}
			<footer
				className="py-6"
				style={{
					backgroundColor: "#0D0D0D",
					boxShadow: "0 -2px 10px rgba(0,0,0,0.7)",
				}}
			>
				<div className="container mx-auto px-6 text-center">
					<p className="text-lg" style={{ color: "#ccc" }}>
						&copy; {new Date().getFullYear()} {name}. Tous droits réservés.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Portfolio;
