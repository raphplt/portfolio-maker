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
		<div className="font-sans">
			{/* Header Sticky */}
			<header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
				<div className="container mx-auto px-6 py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
						{name}
					</h1>
					<nav>
						<ul className="flex space-x-8">
							<li>
								<a href="#hero" className="hover:text-gray-700 transition-colors">
									Accueil
								</a>
							</li>
							<li>
								<a href="#projects" className="hover:text-gray-700 transition-colors">
									Projets
								</a>
							</li>
							<li>
								<a href="#about" className="hover:text-gray-700 transition-colors">
									À propos
								</a>
							</li>
							<li>
								<a href="#contact" className="hover:text-gray-700 transition-colors">
									Contact
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{/* Section Hero */}
			<section
				id="hero"
				className="relative flex items-center justify-center min-h-screen pt-20 pb-10 text-center"
				style={{
					background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), ${backgroundColor}`,
				}}
			>
				<div className="container mx-auto px-6">
					<h2
						className="text-5xl md:text-6xl font-bold mb-6"
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
						className="px-8 py-4 text-lg font-semibold"
						style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
					>
						{ctaButtonText}
						<span className="ml-2">
							<Icon icon="akar-icons:arrow-right" />
						</span>
					</Button>
				</div>
			</section>

			{/* Section Projets */}
			<section id="projects" className="py-20 bg-gray-50">
				<div className="container mx-auto px-6">
					<h2
						className="text-4xl font-bold text-center mb-12"
						style={{ color: primaryColor }}
					>
						{projectsTitle}
					</h2>
					{projects.length > 0 ? (
						<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
							{projects.map((project, index) => (
								<Card
									key={index}
									className="p-6 rounded-lg hover:shadow-xl transition-shadow bg-white"
									style={{ borderColor: secondaryColor, borderWidth: "1px" }}
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

			{/* Section À propos */}
			<section id="about" className="py-20">
				<div className="container mx-auto px-6">
					<h2
						className="text-4xl font-bold text-center mb-12"
						style={{ color: primaryColor }}
					>
						{aboutTitle}
					</h2>
					<div className="max-w-3xl mx-auto text-center">
						<p className="text-lg leading-relaxed" style={{ color: "white" }}>
							{biography}
						</p>
					</div>
				</div>
			</section>

			{/* Section Contact */}
			<section id="contact" className="py-20 bg-gray-50">
				<div className="container mx-auto px-6">
					<h2
						className="text-4xl font-bold text-center mb-12"
						style={{ color: primaryColor }}
					>
						{contactTitle}
					</h2>
					<div className="max-w-xl mx-auto">
						<div className="bg-white p-8 rounded-lg shadow-md">
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
				className="bg-white py-6 shadow-inner"
				style={{ borderTop: `2px solid ${primaryColor}` }}
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
