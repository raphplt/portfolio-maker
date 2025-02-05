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

	return (
		<>
			<div className="min-h-screen" style={{ backgroundColor }}>
				{/* HEADER – Navigation fixe minimaliste avec fond opaque */}
				<header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm">
					<div className="container mx-auto px-6 py-4 flex justify-between items-center">
						<h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
							{name}
						</h1>
						<nav className="hidden md:block">
							<ul className="flex space-x-8">
								<li>
									<a
										href="#hero"
										className="transition-colors hover:text-white"
										style={{ color: "white" }}
									>
										Accueil
									</a>
								</li>
								<li>
									<a
										href="#projects"
										className="transition-colors hover:text-white"
										style={{ color: "white" }}
									>
										{projectsTitle}
									</a>
								</li>
								<li>
									<a
										href="#about"
										className="transition-colors hover:text-white"
										style={{ color: "white" }}
									>
										{aboutTitle}
									</a>
								</li>
								<li>
									<a
										href="#contact"
										className="transition-colors hover:text-white"
										style={{ color: "white" }}
									>
										{contactTitle}
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</header>

				{/* SECTION HERO – Image de fond immersive avec overlay et disposition asymétrique */}
				<section
					id="hero"
					className="relative flex items-center min-h-screen pt-24 pb-12"
					style={{
						background:
							"url('https://images.unsplash.com/photo-1519608487953-e999c86e7455?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat",
					}}
				>
					{/* Overlay sombre */}
					<div className="absolute inset-0 bg-black opacity-60"></div>
					<div className="container mx-auto px-6 relative flex flex-col-reverse md:flex-row items-center">
						<div className="w-full md:w-1/2 mt-8 md:mt-0 animate-slideInLeft">
							<h2
								className="text-5xl md:text-6xl font-extrabold mb-4"
								style={{ color: primaryColor }}
							>
								{welcomeTitle}
							</h2>
							<p
								className="text-lg md:text-xl mb-8 w-fit rounded-lg p-3"
								style={{
									color: "white",
									backdropFilter: "blur(10px)",
									backgroundColor: "rgba(255, 255, 255, 0.3)",
								}}
							>
								{description}
							</p>
							<Button
								color="primary"
								size="lg"
								as={Link}
								href="#projects"
								className="px-8 py-4 text-xl font-semibold rounded-full transition-transform hover:scale-105"
								style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
							>
								{ctaButtonText}
								<span className="ml-2">
									<Icon icon="akar-icons:arrow-right" />
								</span>
							</Button>
						</div>
						<div className="w-full md:w-1/2 animate-fadeIn">
							{/* Illustration Hero remplacée par une image réelle */}
							<img
								src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
								alt="Illustration Hero"
								className="w-full h-auto object-cover rounded-lg shadow-lg"
							/>
						</div>
					</div>
				</section>

				{/* SECTION PROJETS – Grille de cartes avec effet de slide-in */}
				<section id="projects" className="py-20">
					<div className="container mx-auto px-6">
						<h2
							className="text-5xl font-bold text-center mb-12"
							style={{ color: primaryColor }}
						>
							{projectsTitle}
						</h2>
						<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
							{projects.map((project, index) => (
								<Card
									key={index}
									className="p-8 rounded-xl bg-gray-50 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 hover:rotate-1 animate-slideIn"
									style={{ border: `2px solid ${secondaryColor}` }}
								>
									<h3
										className="text-3xl font-semibold mb-4"
										style={{ color: textColor }}
									>
										{project.title}
									</h3>
									<p className="mb-6 text-lg" style={{ color: textColor }}>
										{project.description}
									</p>
									<Button
										as="a"
										href={project.link}
										target="_blank"
										color="secondary"
										size="sm"
										className="rounded-full transition-colors hover:bg-opacity-80 hover:bg-secondary hover:text-white"
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
					</div>
				</section>

				{/* SECTION À PROPOS – Disposition en deux colonnes avec animations opposées */}
				<section id="about" className="py-20 bg-gray-100">
					<div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
						<div className="w-full md:w-1/2 animate-slideInLeft">
							<img
								src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
								alt="À propos"
								className="w-full h-auto object-cover rounded-lg shadow-lg"
							/>
						</div>
						<div className="w-full md:w-1/2 md:pl-12 mt-8 md:mt-0 animate-slideInRight">
							<h2 className="text-5xl font-bold mb-6" style={{ color: primaryColor }}>
								{aboutTitle}
							</h2>
							<p className="text-xl leading-relaxed" style={{ color: textColor }}>
								{biography}
							</p>
						</div>
					</div>
				</section>

				{/* SECTION CONTACT – Carte animée pour les coordonnées */}
				<section id="contact" className="py-20">
					<div className="container mx-auto px-6">
						<h2
							className="text-5xl font-bold text-center mb-12"
							style={{ color: primaryColor }}
						>
							{contactTitle}
						</h2>
						<div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg animate-fadeIn">
							<div className="space-y-6">
								<div className="flex items-center">
									<Icon
										icon="mdi:email"
										className="text-3xl mr-4"
										style={{ color: secondaryColor }}
									/>
									<a
										href={`mailto:${contact.email}`}
										className="text-xl hover:underline"
										style={{ color: textColor }}
									>
										{contact.email}
									</a>
								</div>
								<div className="flex items-center">
									<Icon
										icon="mdi:phone"
										className="text-3xl mr-4"
										style={{ color: secondaryColor }}
									/>
									<a
										href={`tel:${contact.phone}`}
										className="text-xl hover:underline"
										style={{ color: textColor }}
									>
										{contact.phone}
									</a>
								</div>
								<div className="flex items-center">
									<Icon
										icon="mdi:linkedin"
										className="text-3xl mr-4"
										style={{ color: secondaryColor }}
									/>
									<a
										href={contact.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="text-xl hover:underline"
										style={{ color: textColor }}
									>
										LinkedIn
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* FOOTER – Minimal et sobre */}
				<footer className="py-6 bg-gray-200">
					<div className="container mx-auto px-6 text-center">
						<p className="text-xl" style={{ color: textColor }}>
							&copy; {new Date().getFullYear()} {name}. Tous droits réservés.
						</p>
					</div>
				</footer>
			</div>

			{/* Animations incluses directement dans le fichier */}
			<style jsx>{`
				@keyframes slideInLeft {
					from {
						opacity: 0;
						transform: translateX(-50px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}
				.animate-slideInLeft {
					animation: slideInLeft 0.8s ease-out forwards;
				}
				@keyframes slideInRight {
					from {
						opacity: 0;
						transform: translateX(50px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}
				.animate-slideInRight {
					animation: slideInRight 0.8s ease-out forwards;
				}
				@keyframes slideIn {
					from {
						opacity: 0;
						transform: translateY(50px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-slideIn {
					animation: slideIn 0.8s ease-out forwards;
				}
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
				.animate-fadeIn {
					animation: fadeIn 1s ease-out forwards;
				}
			`}</style>
		</>
	);
};

export default Portfolio;
