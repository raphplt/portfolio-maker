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
		<div style={{ backgroundColor, color: textColor }} className="min-h-screen">
			<header style={{ backgroundColor: primaryColor }}>
				<h1>{name}</h1>
				<img src={profilePicture} alt="Profile" />
			</header>

			{welcome.active && (
				<div style={{ backgroundColor: secondaryColor }}>
					{logo && <img src={logo} alt="Logo" />}
					<h1>{welcomeTitle}</h1>
					<p>{description}</p>
					<button style={{ backgroundColor: secondaryColor }}>
						{ctaButtonText}
					</button>
				</div>
			)}
			{about.active && (
				<section className="py-10">
					<h2>{about.title}</h2>
					<p>{biography}</p>
				</section>
			)}
			{projects.active && (
				<section>
					<h2>{projects.title}</h2>
					<ul>
						{projectList.map((project, index) => (
							<li key={index}>
								<h3>{project.title}</h3>
								<p>{project.description}</p>
								<a href={project.link}>Voir le projet</a>
							</li>
						))}
					</ul>
				</section>
			)}
			{testimonials.active && (
				<section>
					<h2>{testimonials.title}</h2>
					<p>{testimonials.description}</p>
				</section>
			)}
			{contact.active && (
				<section>
					<h2>{contact.title}</h2>
					<p>Email: {email}</p>
					<p>Téléphone: {phone}</p>
					<p>
						LinkedIn: <a href={linkedin}>{linkedin}</a>
					</p>
					<p>
						YouTube: <a href={youtube}>{youtube}</a>
					</p>
					<p>
						GitHub: <a href={github}>{github}</a>
					</p>
				</section>
			)}
			<footer
				style={{
					backgroundColor: backgroundColorSecondary,
					color: textColorSecondary,
				}}
			>
				<p>&copy; {name}</p>
			</footer>
		</div>
	);
};

export default Portfolio;
