import { TemplateData } from "@/app/portfolios/new/[id]/helper";

const Portfolio = ({
	informations: {
		name,
		welcomeTitle,
		description,
		biography,
		ctaButtonText,
		logo,
		profilePicture,
	},
	sections: { welcome, about, projects, testimonials, contact },
	projectList,
	contact: { email, phone, linkedin, youtube, github },
	theme: {
		primaryColor,
		secondaryColor,
		tertiaryColor,
		backgroundColor,
		backgroundColorSecondary,
		textColor,
		textColorSecondary,
	},
}: TemplateData) => {
	return (
		<div
			className="min-h-screen w-full"
			style={{
				// Couleur de fond principale
				backgroundColor,
				// Couleur de texte principale
				color: textColor,
				// Exemple de motif de grille en arrière-plan pour rappeler l'effet "papier quadrillé"
				backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
        `,
				backgroundSize: "20px 20px",
			}}
		>
			{/* HEADER */}
			<header
				className="sticky top-0 flex items-center justify-between px-6 py-4 shadow"
				style={{
					backgroundColor: secondaryColor || "#c4a484", // Couleur secondaire
					color: textColorSecondary || "#ffffff", // Couleur de texte secondaire
				}}
			>
				<div className="flex items-center space-x-3">
					{/* Logo (optionnel) */}
					{logo && (
						<img src={logo} alt="Logo" className="h-8 w-8 object-contain rounded" />
					)}
					{/* Nom / Marque */}
					<h1 className="text-xl font-bold uppercase tracking-wider">{name}</h1>
				</div>

				{/* NAVIGATION */}
				<nav>
					<ul className="flex space-x-6 font-medium">
						{welcome.active && (
							<li>
								<a
									href="#welcome"
									className="hover:underline"
									style={{ color: textColorSecondary }}
								>
									{welcome.title || "Home"}
								</a>
							</li>
						)}
						{about.active && (
							<li>
								<a
									href="#about"
									className="hover:underline"
									style={{ color: textColorSecondary }}
								>
									{about.title || "About"}
								</a>
							</li>
						)}
						{projects.active && (
							<li>
								<a
									href="#projects"
									className="hover:underline"
									style={{ color: textColorSecondary }}
								>
									{projects.title || "Projects"}
								</a>
							</li>
						)}
						{testimonials.active && (
							<li>
								<a
									href="#testimonials"
									className="hover:underline"
									style={{ color: textColorSecondary }}
								>
									{testimonials.title || "Testimonials"}
								</a>
							</li>
						)}
						{contact.active && (
							<li>
								<a
									href="#contact"
									className="hover:underline"
									style={{ color: textColorSecondary }}
								>
									{contact.title || "Contact"}
								</a>
							</li>
						)}
					</ul>
				</nav>
			</header>

			{/* CONTENU PRINCIPAL */}
			<main className="mt-8 pb-16">
				{/* Fenêtre "Welcome" */}
				{welcome.active && (
					<section
						id="welcome"
						className="relative w-11/12 max-w-5xl mx-auto mb-12 border-4 rounded-2xl shadow-lg"
						style={{
							borderColor: tertiaryColor || "#a97b50",
							backgroundColor: backgroundColorSecondary || "#fdfaf6",
						}}
					>
						{/* Barre supérieure de la "fenêtre" */}
						<div
							className="px-4 py-2 flex items-center rounded-t-xl"
							style={{ backgroundColor: primaryColor || "#d19a66" }}
						>
							<h2 className="text-lg font-semibold tracking-wide text-white">
								{welcomeTitle || "Welcome"}
							</h2>
						</div>
						{/* Contenu de la fenêtre */}
						<div className="p-6 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
							{/* Image de profil */}
							{profilePicture && (
								<img
									src={profilePicture}
									alt="Profile"
									className="w-40 h-40 object-cover rounded-lg shadow-md"
								/>
							)}
							{/* Texte de description */}
							<div>
								<p className="text-base md:text-lg mb-4">{description}</p>
								{ctaButtonText && (
									<button
										className="px-4 py-2 rounded-lg font-semibold"
										style={{
											backgroundColor: primaryColor || "#d19a66",
											color: "#ffffff",
										}}
									>
										{ctaButtonText}
									</button>
								)}
							</div>
						</div>
					</section>
				)}

				{/* Fenêtre "About" */}
				{about.active && (
					<section
						id="about"
						className="relative w-11/12 max-w-5xl mx-auto mb-12 border-4 rounded-2xl shadow-lg"
						style={{
							borderColor: tertiaryColor || "#a97b50",
							backgroundColor: backgroundColorSecondary || "#fdfaf6",
						}}
					>
						<div
							className="px-4 py-2 rounded-t-xl"
							style={{ backgroundColor: primaryColor || "#d19a66" }}
						>
							<h2 className="text-lg font-semibold text-white">
								{about.title || "About"}
							</h2>
						</div>
						<div className="p-6">
							<p className="text-base md:text-lg">{biography}</p>
						</div>
					</section>
				)}

				{/* Fenêtre "Projects" */}
				{projects.active && (
					<section
						id="projects"
						className="relative w-11/12 max-w-5xl mx-auto mb-12 border-4 rounded-2xl shadow-lg"
						style={{
							borderColor: tertiaryColor || "#a97b50",
							backgroundColor: backgroundColorSecondary || "#fdfaf6",
						}}
					>
						<div
							className="px-4 py-2 rounded-t-xl"
							style={{ backgroundColor: primaryColor || "#d19a66" }}
						>
							<h2 className="text-lg font-semibold text-white">
								{projects.title || "Projects"}
							</h2>
						</div>
						<div className="p-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{projectList &&
								projectList.length > 0 &&
								projectList.map((project, index) => (
									<div
										key={index}
										className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-shadow"
									>
										<h3 className="text-md font-semibold mb-2">{project.title}</h3>
										<p className="text-sm mb-2">{project.description}</p>
										{project.link && (
											<a
												href={project.link}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:underline text-sm"
											>
												Voir le projet →
											</a>
										)}
									</div>
								))}
						</div>
					</section>
				)}

				{/* Fenêtre "Testimonials" */}
				{testimonials.active && (
					<section
						id="testimonials"
						className="relative w-11/12 max-w-5xl mx-auto mb-12 border-4 rounded-2xl shadow-lg"
						style={{
							borderColor: tertiaryColor || "#a97b50",
							backgroundColor: backgroundColorSecondary || "#fdfaf6",
						}}
					>
						<div
							className="px-4 py-2 rounded-t-xl"
							style={{ backgroundColor: primaryColor || "#d19a66" }}
						>
							<h2 className="text-lg font-semibold text-white">
								{testimonials.title || "Testimonials"}
							</h2>
						</div>
						<div className="p-6">
							<p className="mb-2">{testimonials.description}</p>
							{/* Vous pouvez ajouter ici des éléments concrets de témoignages */}
						</div>
					</section>
				)}

				{/* Fenêtre "Contact" */}
				{contact.active && (
					<section
						id="contact"
						className="relative w-11/12 max-w-5xl mx-auto mb-12 border-4 rounded-2xl shadow-lg"
						style={{
							borderColor: tertiaryColor || "#a97b50",
							backgroundColor: backgroundColorSecondary || "#fdfaf6",
						}}
					>
						<div
							className="px-4 py-2 rounded-t-xl"
							style={{ backgroundColor: primaryColor || "#d19a66" }}
						>
							<h2 className="text-lg font-semibold text-white">
								{contact.title || "Contact"}
							</h2>
						</div>
						<div className="p-6 space-y-2">
							{email && (
								<p className="text-base">
									<strong>Email:</strong> {email}
								</p>
							)}
							{phone && (
								<p className="text-base">
									<strong>Téléphone:</strong> {phone}
								</p>
							)}
							{linkedin && (
								<p className="text-base">
									<strong>LinkedIn:</strong>{" "}
									<a
										href={linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:underline"
									>
										{linkedin}
									</a>
								</p>
							)}
							{youtube && (
								<p className="text-base">
									<strong>YouTube:</strong>{" "}
									<a
										href={youtube}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:underline"
									>
										{youtube}
									</a>
								</p>
							)}
							{github && (
								<p className="text-base">
									<strong>GitHub:</strong>{" "}
									<a
										href={github}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:underline"
									>
										{github}
									</a>
								</p>
							)}
						</div>
					</section>
				)}
			</main>

			{/* FOOTER */}
			<footer
				className="py-4 text-center"
				style={{ backgroundColor: secondaryColor, color: textColorSecondary }}
			>
				<p className="text-sm">
					© {new Date().getFullYear()} {name}. Tous droits réservés.
				</p>
			</footer>
		</div>
	);
};

export default Portfolio;
