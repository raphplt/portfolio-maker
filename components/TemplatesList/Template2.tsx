"use client";
import React from "react";
import { Button, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface PortfolioProps {
	name: string;
	description: string;
	biography: string;
	skills: string[]; // Nouvelle section : compétences
	projects: { title: string; description: string; link: string }[];
	testimonials: { author: string; message: string }[]; // Nouvelle section : témoignages
	contact: { email: string; phone: string; linkedin: string };
}

const CreativePortfolio: React.FC<PortfolioProps> = ({
	name,
	description,
	biography,
	skills,
	projects,
	testimonials,
	contact,
}) => {
	// VARIABLES DE THÈME (modifiable)
	const theme = {
		primaryColor: "#1E40AF", // Bleu foncé
		secondaryColor: "#F59E0B", // Jaune doré
		backgroundColor: "#EFF6FF", // Bleu très clair
		textColor: "#111827", // Gris anthracite
		accentColor: "#10B981", // Vert émeraude
	};

	return (
		<div
			className="min-h-screen"
			style={{ backgroundColor: theme.backgroundColor }}
		>
			{/* HEADER */}
			<header
				className="bg-white shadow sticky top-0 z-50"
				style={{ borderBottom: `3px solid ${theme.primaryColor}` }}
			>
				<div className="container mx-auto px-6 py-4 flex justify-between items-center">
					<h1
						className="text-3xl font-extrabold"
						style={{ color: theme.primaryColor }}
					>
						{name}
					</h1>
					<nav>
						<ul className="flex space-x-8">
							<li>
								<a
									href="#home"
									className="hover:text-accent"
									style={{ color: theme.textColor }}
								>
									Accueil
								</a>
							</li>
							<li>
								<a
									href="#skills"
									className="hover:text-accent"
									style={{ color: theme.textColor }}
								>
									Compétences
								</a>
							</li>
							<li>
								<a
									href="#projects"
									className="hover:text-accent"
									style={{ color: theme.textColor }}
								>
									Projets
								</a>
							</li>
							<li>
								<a
									href="#about"
									className="hover:text-accent"
									style={{ color: theme.textColor }}
								>
									À propos
								</a>
							</li>
							<li>
								<a
									href="#testimonials"
									className="hover:text-accent"
									style={{ color: theme.textColor }}
								>
									Témoignages
								</a>
							</li>
							<li>
								<a
									href="#contact"
									className="hover:text-accent"
									style={{ color: theme.textColor }}
								>
									Contact
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{/* SECTION ACCUEIL */}
			<section id="home" className="container mx-auto px-6 py-16 text-center">
				<h2
					className="text-5xl font-bold mb-6"
					style={{ color: theme.primaryColor }}
				>
					{description}
				</h2>
				<p className="text-xl mb-8" style={{ color: theme.textColor }}>
					Découvrez mon univers créatif et mes réalisations.
				</p>
				<Button
					color="primary"
					size="lg"
					as={Link}
					href="#projects"
					endContent={<Icon icon="akar-icons:arrow-right" />}
				>
					Voir mes projets
				</Button>
			</section>

			{/* SECTION COMPÉTENCES */}
			<section id="skills" className="bg-white py-16">
				<div className="container mx-auto px-6">
					<h2
						className="text-4xl font-bold mb-8"
						style={{ color: theme.primaryColor }}
					>
						Compétences
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{skills.map((skill, index) => (
							<div
								key={index}
								className="p-4 rounded shadow hover:shadow-lg transition"
								style={{
									backgroundColor: theme.backgroundColor,
									color: theme.textColor,
								}}
							>
								<p className="text-center font-semibold">{skill}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* SECTION PROJETS */}
			<section id="projects" className="container mx-auto px-6 py-16">
				<h2
					className="text-4xl font-bold mb-12"
					style={{ color: theme.primaryColor }}
				>
					Mes Projets
				</h2>
				<div className="grid gap-8 md:grid-cols-2">
					{projects.map((project, index) => (
						<Card
							key={index}
							className="p-8 hover:shadow-2xl transition-shadow"
							style={{ borderColor: theme.accentColor }}
						>
							<h3
								className="text-3xl font-semibold mb-4"
								style={{ color: theme.textColor }}
							>
								{project.title}
							</h3>
							<p className="mb-6" style={{ color: theme.textColor }}>
								{project.description}
							</p>
							<Button
								as="a"
								href={project.link}
								target="_blank"
								color="secondary"
								size="sm"
							>
								Découvrir
							</Button>
						</Card>
					))}
				</div>
			</section>

			{/* SECTION À PROPOS */}
			<section id="about" className="bg-white py-16">
				<div className="container mx-auto px-6">
					<h2
						className="text-4xl font-bold mb-8"
						style={{ color: theme.primaryColor }}
					>
						À propos de moi
					</h2>
					<p className="text-xl leading-relaxed" style={{ color: theme.textColor }}>
						{biography}
					</p>
				</div>
			</section>

			{/* SECTION TÉMOIGNAGES */}
			<section id="testimonials" className="container mx-auto px-6 py-16">
				<h2
					className="text-4xl font-bold mb-12"
					style={{ color: theme.primaryColor }}
				>
					Témoignages
				</h2>
				<div className="grid gap-8 md:grid-cols-2">
					{testimonials.map((testimonial, index) => (
						<Card
							key={index}
							className="p-6 bg-gray-50 shadow-md hover:shadow-xl transition-shadow"
						>
							<p className="text-lg italic mb-4" style={{ color: theme.textColor }}>
								"{testimonial.message}"
							</p>
							<p
								className="text-right font-semibold"
								style={{ color: theme.accentColor }}
							>
								- {testimonial.author}
							</p>
						</Card>
					))}
				</div>
			</section>

			{/* SECTION CONTACT */}
			<section id="contact" className="bg-white py-16">
				<div className="container mx-auto px-6">
					<h2
						className="text-4xl font-bold mb-8"
						style={{ color: theme.primaryColor }}
					>
						Contact
					</h2>
					<div className="space-y-4">
						<p style={{ color: theme.textColor }}>
							Email :{" "}
							<a
								href={`mailto:${contact.email}`}
								className="underline hover:text-secondary"
								style={{ color: theme.accentColor }}
							>
								{contact.email}
							</a>
						</p>
						<p style={{ color: theme.textColor }}>
							Téléphone :{" "}
							<a
								href={`tel:${contact.phone}`}
								className="underline hover:text-secondary"
								style={{ color: theme.accentColor }}
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
								className="underline hover:text-secondary"
								style={{ color: theme.accentColor }}
							>
								{contact.linkedin}
							</a>
						</p>
					</div>
				</div>
			</section>

			{/* FOOTER */}
			<footer className="bg-gray-50 shadow mt-12">
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

export default CreativePortfolio;
