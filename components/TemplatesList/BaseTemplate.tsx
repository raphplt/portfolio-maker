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
			className="min-h-screen flex flex-col"
			style={{ backgroundColor, color: textColor }}
		>
			{/* Header */}
			<header className="flex justify-between items-center px-8 py-6 bg-black text-gray-100 fixed top-0 left-0 w-full z-10">
				<a href="#" className="flex items-center space-x-2">
					<h1 className="text-lg font-semibold">{name}</h1>
					{/* {logo && <img src={logo} alt="Logo" className="w-8 h-8" />} */}
				</a>
				<nav className="">
					<ul className="flex space-x-8 text-sm font-medium">
						<li>
							<a href="#welcome" className="hover:text-yellow-500">
								WORK
							</a>
						</li>
						<li>
							<a href="#about" className="hover:text-yellow-500">
								ABOUT
							</a>
						</li>
						<li>
							<a href="#projects" className="hover:text-yellow-500">
								PROJECTS
							</a>
						</li>
						<li>
							<a href="#testimonials" className="hover:text-yellow-500">
								TESTIMONIALS
							</a>
						</li>
						<li>
							<a href="#contact" className="hover:text-yellow-500">
								CONTACT
							</a>
						</li>
					</ul>
				</nav>
			</header>

			{/* Welcome Section */}
			{welcome.active && (
				<section
					id="welcome"
					className="h-screen flex items-center justify-between px-20 bg-black"
				>
					<div className="max-w-lg">
						<h1 className="text-6xl font-bold text-white">
							hi, i’m <span className="text-yellow-500">{name}</span>.
						</h1>
						<p className="text-lg text-gray-400 mt-4">{description}</p>
						<div className="flex space-x-4 mt-8">
							<button className="px-6 py-3 bg-transparent border-2 border-purple-500 text-purple-500 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition-colors">
								View more →
							</button>
							<button className="px-6 py-3 bg-transparent border-2 border-yellow-500 text-yellow-500 rounded-lg font-semibold hover:bg-yellow-500 hover:text-black transition-colors">
								Resume CV →
							</button>
						</div>
					</div>
					<div className="relative">
						<img
							src={profilePicture}
							alt="Profile"
							className="w-80 h-96 rounded-lg object-cover"
						/>
						<div className="absolute top-0 left-0 w-40 h-40 border-4 border-purple-500 transform -translate-x-6 -translate-y-6"></div>
						<div className="absolute bottom-0 right-0 w-48 h-48 border-4 border-yellow-500 transform translate-x-6 translate-y-6"></div>
					</div>
				</section>
			)}

			{/* About Section */}
			{about.active && (
				<section
					id="about"
					className="py-20 px-12 text-center bg-gray-900"
					style={{ color: textColor }}
				>
					<h2 className="text-4xl font-bold mb-6 text-yellow-500">{about.title}</h2>
					<p className="text-lg text-gray-400">{biography}</p>
				</section>
			)}

			{/* Projects Section */}
			{projects.active && (
				<section id="projects" className="py-20 px-12 bg-black text-white">
					<h2 className="text-4xl font-bold mb-12 text-yellow-500">
						{projects.title}
					</h2>
					<ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{projectList &&
							projectList.length > 0 &&
							projectList.map((project, index) => (
								<li
									key={index}
									className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
								>
									<h3 className="text-xl font-bold text-white">{project.title}</h3>
									<p className="text-gray-400 mt-2">{project.description}</p>
									<a
										href={project.link}
										className="mt-4 inline-block text-yellow-500 font-semibold hover:underline"
									>
										Voir le projet →
									</a>
								</li>
							))}
					</ul>
				</section>
			)}

			{/* Testimonials Section */}
			{testimonials.active && (
				<section
					id="testimonials"
					className="py-20 px-12 text-center bg-gray-900 text-white"
				>
					<h2 className="text-4xl font-bold mb-6 text-yellow-500">
						{testimonials.title}
					</h2>
					<p className="text-lg text-gray-400">{testimonials.description}</p>
				</section>
			)}

			{/* Contact Section */}
			{contact.active && (
				<section
					id="contact"
					className="py-20 px-12 text-center bg-black text-white"
				>
					<h2 className="text-4xl font-bold mb-6 text-yellow-500">
						{contact.title}
					</h2>
					<p className="text-lg">Email: {email}</p>
					<p className="text-lg">Téléphone: {phone}</p>
					<p className="text-lg">
						LinkedIn:{" "}
						<a
							href={linkedin}
							className="text-yellow-500 font-semibold hover:underline"
						>
							{linkedin}
						</a>
					</p>
					<p className="text-lg">
						YouTube:{" "}
						<a
							href={youtube}
							className="text-yellow-500 font-semibold hover:underline"
						>
							{youtube}
						</a>
					</p>
					<p className="text-lg">
						GitHub:{" "}
						<a
							href={github}
							className="text-yellow-500 font-semibold hover:underline"
						>
							{github}
						</a>
					</p>
				</section>
			)}

			{/* Footer */}
			<footer
				className="py-6 text-center bg-gray-900 text-gray-400"
				style={{ color: textColorSecondary }}
			>
				<p>&copy; {name}</p>
			</footer>
		</div>
	);
};

export default Portfolio;
