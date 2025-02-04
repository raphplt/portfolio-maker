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
		primaryColor: string; // Couleur principale (accent)
		secondaryColor: string; // Accent complémentaire
		backgroundColor: string; // Fond général
		textColor: string; // Couleur du texte
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

	return (
		<div
			className="flex"
			style={{ backgroundColor: backgroundColor, color: textColor }}
		>
			{/* Sidebar de navigation fixe */}
			<aside
				className="fixed top-0 left-0 h-full w-64 p-6"
				style={{ backgroundColor: "#111" }}
			>
				<h1 className="text-3xl font-bold mb-10" style={{ color: primaryColor }}>
					{name}
				</h1>
				<nav>
					<ul className="space-y-4">
						<li>
							<a
								href="#hero"
								className="hover:text-white hover:font-bold"
								style={{ color: "white" }}
							>
								Accueil
							</a>
						</li>
						<li>
							<a
								href="#projects"
								className="hover:text-white hover:font-bold"
								style={{ color: "white" }}
							>
								{projectsTitle}
							</a>
						</li>
						<li>
							<a
								href="#about"
								className="hover:text-white hover:font-bold"
								style={{ color: "white" }}
							>
								{aboutTitle}
							</a>
						</li>
						<li>
							<a
								href="#contact"
								className="hover:text-white hover:font-bold"
								style={{ color: "white" }}
							>
								{contactTitle}
							</a>
						</li>
					</ul>
				</nav>
			</aside>

			{/* Contenu principal */}
			<main className="ml-64 flex-1">
				{/* Section Hero – Grand visuel avec overlay et gradient */}
				<section
					id="hero"
					className="h-screen relative flex items-center justify-center text-center p-6"
					style={{
						background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
					}}
				>
					{/* Overlay semi-transparent pour adoucir le gradient */}
					<div
						className="absolute inset-0"
						style={{ backgroundColor: backgroundColor, opacity: 0.5 }}
					></div>
					<div className="relative z-10">
						<h2 className="text-5xl font-extrabold mb-4" style={{ color: textColor }}>
							{welcomeTitle}
						</h2>
						<p className="text-xl mb-6" style={{ color: textColor }}>
							{description}
						</p>
						<Button
							as={Link}
							href="#projects"
							color="primary"
							size="lg"
							className="rounded-full px-8 py-3 transition-transform hover:scale-105"
							style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
						>
							{ctaButtonText}
							<span className="ml-2">
								<Icon icon="akar-icons:arrow-right" />
							</span>
						</Button>
					</div>
				</section>

				{/* Section Projets – Disposition en grille, style épuré */}
				<section
					id="projects"
					className="py-20 px-6"
					style={{ backgroundColor: "#222" }}
				>
					<div className="max-w-6xl mx-auto">
						<h2
							className="text-4xl font-bold text-center mb-12"
							style={{ color: primaryColor }}
						>
							{projectsTitle}
						</h2>
						{projects.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{projects.map((project, index) => (
									<Card
										key={index}
										className="p-6 rounded-xl hover:shadow-2xl transition-shadow"
										style={{
											backgroundColor: "#333",
											border: `1px solid ${secondaryColor}`,
										}}
									>
										<h3
											className="text-2xl font-semibold mb-2"
											style={{ color: primaryColor }}
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
											className="rounded-full"
											style={{
												backgroundColor: secondaryColor,
												borderColor: secondaryColor,
											}}
										>
											Découvrir
										</Button>
									</Card>
								))}
							</div>
						) : (
							<p className="text-center text-xl" style={{ color: textColor }}>
								Aucun projet disponible.
							</p>
						)}
					</div>
				</section>

				{/* Section À propos – Disposition en deux colonnes avec image fictive */}
				<section
					id="about"
					className="py-20 px-6"
					style={{ backgroundColor: "#1a1a1a" }}
				>
					<div className="max-w-4xl mx-auto">
						<h2
							className="text-4xl font-bold text-center mb-10"
							style={{ color: primaryColor }}
						>
							{aboutTitle}
						</h2>
						<div className="flex flex-col md:flex-row items-center gap-8">
							<div className="flex-1">
								{/* Image fictive, à remplacer par votre visuel */}
								<div
									className="w-full h-64 bg-cover bg-center rounded-lg"
									style={{
										backgroundImage:
											"url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')",
									}}
								></div>
							</div>
							<div className="flex-1">
								<p className="text-lg leading-relaxed" style={{ color: "white" }}>
									{biography}
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Section Contact – Carte d’informations de contact */}
				<section
					id="contact"
					className="py-20 px-6"
					style={{ backgroundColor: "#292929" }}
				>
					<div className="max-w-4xl mx-auto">
						<h2
							className="text-4xl font-bold text-center mb-10"
							style={{ color: primaryColor }}
						>
							{contactTitle}
						</h2>
						<Card
							className="p-8 rounded-xl"
							style={{
								backgroundColor: "#333",
								border: `2px solid ${secondaryColor}`,
							}}
						>
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
										style={{ color: "white" }}
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
										style={{ color: "white" }}
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
										style={{ color: "white" }}
									>
										LinkedIn
									</a>
								</div>
							</div>
						</Card>
					</div>
				</section>

				{/* Footer – Simple et centré */}
				<footer className="py-6 px-6" style={{ backgroundColor: "#111" }}>
					<div className="text-center">
						<p className="text-sm" style={{ color: "white" }}>
							&copy; {new Date().getFullYear()} {name}. Tous droits réservés.
						</p>
					</div>
				</footer>
			</main>
		</div>
	);
};

export default Portfolio;
