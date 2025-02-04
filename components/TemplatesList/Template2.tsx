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
		<div className="min-h-screen" style={{ backgroundColor }}>
			{/* HEADER – effet glassmorphism */}
			<header
				className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-md"
				style={{ borderBottom: `3px solid ${primaryColor}` }}
			>
				<div className="container mx-auto px-6 py-4 flex justify-between items-center">
					<h1 className="text-3xl font-extrabold" style={{ color: primaryColor }}>
						{name}
					</h1>
					<nav>
						<ul className="flex space-x-8">
							<li>
								<a
									href="#hero"
									className="transition-colors hover:text-teal-500"
									style={{ color: textColor }}
								>
									Accueil
								</a>
							</li>
							<li>
								<a
									href="#projects"
									className="transition-colors hover:text-teal-500"
									style={{ color: textColor }}
								>
									{projectsTitle}
								</a>
							</li>
							<li>
								<a
									href="#about"
									className="transition-colors hover:text-teal-500"
									style={{ color: textColor }}
								>
									{aboutTitle}
								</a>
							</li>
							<li>
								<a
									href="#contact"
									className="transition-colors hover:text-teal-500"
									style={{ color: textColor }}
								>
									{contactTitle}
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{/* SECTION HERO – fond en gradient audacieux */}
			<section
				id="hero"
				className="relative flex flex-col items-center justify-center min-h-screen text-center pt-20 pb-16"
				style={{
					background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
				}}
			>
				<div className="container mx-auto px-6">
					<h2 className="text-6xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg">
						{welcomeTitle}
					</h2>
					<p className="text-2xl md:text-3xl mb-8 text-white drop-shadow-md">
						{description}
					</p>
					<Button
						color="primary"
						size="lg"
						as={Link}
						href="#projects"
						className="px-8 py-4 text-xl font-semibold rounded-full hover:scale-105 transition-transform"
						style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
					>
						{ctaButtonText}
						<span className="ml-2">
							<Icon icon="akar-icons:arrow-right" />
						</span>
					</Button>
				</div>
			</section>

			{/* SECTION PROJETS */}
			<section id="projects" className="py-20 bg-white/80 backdrop-blur-sm">
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
								className="p-8 rounded-xl bg-white/70 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all"
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
				</div>
			</section>

			{/* SECTION À PROPOS */}
			<section id="about" className="py-20">
				<div className="container mx-auto px-6">
					<h2
						className="text-5xl font-bold text-center mb-12"
						style={{ color: primaryColor }}
					>
						{aboutTitle}
					</h2>
					<div className="max-w-3xl mx-auto">
						<p
							className="text-xl leading-relaxed text-center"
							style={{ color: textColor }}
						>
							{biography}
						</p>
					</div>
				</div>
			</section>

			{/* SECTION CONTACT */}
			<section id="contact" className="py-20">
				<div className="container mx-auto px-6">
					<h2
						className="text-5xl font-bold text-center mb-12"
						style={{ color: primaryColor }}
					>
						{contactTitle}
					</h2>
					<div className="max-w-xl mx-auto bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-lg">
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

			{/* FOOTER */}
			<footer
				className="py-6 bg-white/80 backdrop-blur-md shadow-inner"
				style={{ borderTop: `3px solid ${primaryColor}` }}
			>
				<div className="container mx-auto px-6 text-center">
					<p className="text-xl" style={{ color: textColor }}>
						&copy; {new Date().getFullYear()} {name}. Tous droits réservés.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Portfolio;
