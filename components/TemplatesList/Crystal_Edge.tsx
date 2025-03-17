import { TemplateData } from "@/app/portfolios/new/[id]/helper";

const GeometricShape = ({ style }: { style: React.CSSProperties }) => (
	<div className="absolute pointer-events-none opacity-20" style={style} />
);

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
			className="min-h-screen flex flex-col relative overflow-hidden"
			style={{
				background: backgroundColor
					? backgroundColor
					: "linear-gradient(135deg, #E2ECFF 0%, #ADC8FF 50%, #8BA7FF 100%)",
				color: textColor ? textColor : "#000",
			}}
		>
			{/* Formes géométriques décoratives */}
			<GeometricShape
				style={{
					width: "40rem",
					height: "40rem",
					background: `radial-gradient(circle at center, ${
						primaryColor || "#000"
					} 0%, transparent 70%)`,
					top: "-20rem",
					right: "-20rem",
					filter: "blur(100px)",
					zIndex: 0,
				}}
			/>
			<GeometricShape
				style={{
					width: "30rem",
					height: "30rem",
					background: `radial-gradient(circle at center, ${
						secondaryColor || "#444"
					} 0%, transparent 70%)`,
					bottom: "-15rem",
					left: "-15rem",
					filter: "blur(80px)",
					zIndex: 0,
				}}
			/>

			{/* HEADER avec glassmorphism */}
			<header className="backdrop-blur-md bg-white/30 sticky top-0 z-50 flex justify-between items-center py-4 px-8 shadow-lg">
				{/* Logo + Nom avec animation */}
				<div className="flex items-center space-x-3 hover:scale-105 transition-transform">
					{logo && (
						<div className="rounded-full p-1 bg-white/50 backdrop-blur-sm">
							<img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
						</div>
					)}
					<h1
						className="text-xl font-bold bg-clip-text text-transparent"
						style={{
							backgroundImage: `linear-gradient(45deg, ${primaryColor || "#000"}, ${
								secondaryColor || "#444"
							})`,
						}}
					>
						{name}
					</h1>
				</div>

				{/* Navigation avec hover effects */}
				<nav className="backdrop-blur-sm bg-white/20 rounded-full px-6 py-2">
					<ul className="flex space-x-6 text-sm font-semibold">
						{welcome.active && (
							<li>
								<a href="#welcome" className="relative group">
									<span className="relative z-10">Accueil</span>
									<span
										className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
										style={{ background: primaryColor || "#000" }}
									/>
								</a>
							</li>
						)}
						{/* Répéter pour les autres liens de navigation... */}
					</ul>
				</nav>
			</header>

			{/* SECTION WELCOME avec animations */}
			{welcome.active && (
				<section
					id="welcome"
					className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-32"
				>
					<div className="max-w-xl space-y-6 z-10">
						<h2 className="text-6xl md:text-7xl font-bold leading-tight">
							{welcomeTitle} <br />
							<span className="block mt-2">
								This is{" "}
								<span
									className="relative"
									style={{
										color: secondaryColor ? secondaryColor : "#000",
									}}
								>
									{name}
									<span
										className="absolute -bottom-2 left-0 w-full h-1 rounded-full"
										style={{
											background: `linear-gradient(90deg, ${
												primaryColor || "#000"
											}, transparent)`,
										}}
									/>
								</span>
							</span>
						</h2>
						<p
							className="text-xl leading-relaxed"
							style={{ color: textColorSecondary }}
						>
							{description}
						</p>
						{ctaButtonText && (
							<div className="mt-8">
								<a
									href="#projects"
									className="px-8 py-4 inline-block rounded-full font-medium relative overflow-hidden group"
									style={{
										background: `linear-gradient(45deg, ${primaryColor || "#000"}, ${
											secondaryColor || "#444"
										})`,
									}}
								>
									<span className="relative z-10 text-white">{ctaButtonText}</span>
									<div
										className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
										style={{
											background: `linear-gradient(45deg, ${secondaryColor || "#444"}, ${
												primaryColor || "#000"
											})`,
										}}
									/>
								</a>
							</div>
						)}
					</div>

					{/* Image de profil avec effet */}
					<div className="mt-10 md:mt-0 md:ml-12 z-10">
						{profilePicture && (
							<div className="relative group">
								<div
									className="absolute inset-0 rounded-lg transform rotate-6 transition-transform group-hover:rotate-12"
									style={{
										background: `linear-gradient(45deg, ${primaryColor || "#000"}, ${
											secondaryColor || "#444"
										})`,
									}}
								/>
								<img
									src={profilePicture}
									alt="Profile"
									className="relative w-72 h-72 object-cover rounded-lg shadow-xl transform transition-transform group-hover:translate-x-2 group-hover:-translate-y-2"
								/>
							</div>
						)}
					</div>
				</section>
			)}
			{/* SECTION ABOUT */}
			{about.active && (
				<section
					id="about"
					className="relative px-8 md:px-20 py-32 overflow-hidden"
					style={{ backgroundColor: backgroundColorSecondary || "#F3F7FF" }}
				>
					{/* Decorative elements */}
					<div
						className="absolute top-0 right-0 w-96 h-96 opacity-10"
						style={{
							background: `radial-gradient(circle at top right, ${
								primaryColor || "#000"
							}, transparent)`,
							filter: "blur(60px)",
						}}
					/>

					<div className="max-w-7xl mx-auto">
						<h2
							className="text-5xl font-bold mb-12 relative inline-block"
							style={{ color: secondaryColor || "#000" }}
						>
							{about.title || "About"}
							<span
								className="absolute -bottom-2 left-0 w-1/2 h-1 rounded-full"
								style={{
									background: `linear-gradient(90deg, ${
										primaryColor || "#000"
									}, transparent)`,
								}}
							/>
						</h2>

						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div className="space-y-6">
								<p
									className="text-xl leading-relaxed"
									style={{ color: textColorSecondary }}
								>
									{biography || "Lorem ipsum..."}
								</p>

								{/* Skills section */}
								<div className="mt-8 grid grid-cols-2 gap-4">
									{["React", "TypeScript", "Node.js", "UI/UX"].map((skill) => (
										<div
											key={skill}
											className="p-4 rounded-lg backdrop-blur-sm relative overflow-hidden group"
											style={{
												backgroundColor: "white",
												border: `1px solid ${primaryColor}20`,
											}}
										>
											<span className="font-medium">{skill}</span>
											<div
												className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
												style={{
													background: primaryColor || "#000",
												}}
											/>
										</div>
									))}
								</div>
							</div>

							{/* Decorative code snippet */}
							<div
								className="hidden md:block p-8 rounded-xl backdrop-blur-sm"
								style={{
									backgroundColor: "white",
									border: `1px solid ${primaryColor}20`,
								}}
							>
								<pre className="text-sm opacity-70">
									<code>
										{`const ${name.split(" ")[0]} = {
  passion: "Web Development",
  experience: "5+ years",
  loves: ["Clean Code", "UI Design"]
};`}
									</code>
								</pre>
							</div>
						</div>
					</div>
				</section>
			)}

			{/* SECTION PROJECTS */}
			{projects.active && (
				<section id="projects" className="px-8 md:px-20 py-32">
					<h2
						className="text-5xl font-bold mb-16 text-center"
						style={{ color: secondaryColor || "#000" }}
					>
						{projects.title || "Featured Works"}
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projectList &&
							projectList.map((project, index) => (
								<div
									key={index}
									className="group relative bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
									style={{
										border: `1px solid ${primaryColor}20`,
									}}
								>
									<div className="p-6 relative z-10">
										<h3
											className="text-2xl font-bold mb-3"
											style={{ color: primaryColor }}
										>
											{project.title}
										</h3>
										<p className="text-base mb-4" style={{ color: textColorSecondary }}>
											{project.description}
										</p>
										{project.link && (
											<a
												href={project.link}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center space-x-2 font-medium transition-colors"
												style={{ color: primaryColor }}
											>
												<span>View Project</span>
												<span className="group-hover:translate-x-1 transition-transform">
													→
												</span>
											</a>
										)}
									</div>
									<div
										className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
										style={{
											background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
										}}
									/>
								</div>
							))}
					</div>
				</section>
			)}

			{/* SECTION TESTIMONIALS */}
			{testimonials.active && (
				<section
					id="testimonials"
					className="relative px-8 md:px-20 py-32"
					style={{ backgroundColor: backgroundColorSecondary || "#F3F7FF" }}
				>
					<div className="max-w-6xl mx-auto">
						<h2
							className="text-5xl font-bold mb-16 text-center"
							style={{ color: secondaryColor || "#000" }}
						>
							{testimonials.title || "What People Say"}
						</h2>

						<div className="grid md:grid-cols-2 gap-8">
							{[1, 2].map((_, i) => (
								<div
									key={i}
									className="p-8 rounded-xl backdrop-blur-sm relative group"
									style={{
										backgroundColor: "white",
										border: `1px solid ${primaryColor}20`,
									}}
								>
									<div
										className="absolute text-8xl opacity-10 top-4 left-4"
										style={{ color: primaryColor }}
									>
										&quot;
									</div>
									<p className="text-lg relative z-10 mb-6">
										Amazing work and great communication throughout the project.
									</p>
									<div className="flex items-center space-x-4">
										<div
											className="w-12 h-12 rounded-full"
											style={{
												background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
											}}
										/>
										<div>
											<div className="font-medium">John Doe</div>
											<div className="text-sm opacity-70">CEO at TechCorp</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* SECTION CONTACT */}
			{contact.active && (
				<section id="contact" className="px-8 md:px-20 py-32">
					<div className="max-w-6xl mx-auto">
						<h2
							className="text-5xl font-bold mb-16 text-center"
							style={{ color: secondaryColor || "#000" }}
						>
							{contact.title || "Let's Connect"}
						</h2>

						<div className="grid md:grid-cols-2 gap-16">
							{/* Contact Info */}
							<div className="space-y-8">
								<h3
									className="text-2xl font-semibold mb-6"
									style={{ color: primaryColor }}
								>
									Get in Touch
								</h3>

								{/* Contact cards */}
								{[
									{ icon: "📧", label: "Email", value: email, href: `mailto:${email}` },
									{ icon: "📱", label: "Phone", value: phone },
									{
										icon: "💼",
										label: "LinkedIn",
										value: "Connect on LinkedIn",
										href: linkedin,
									},
									{
										icon: "📺",
										label: "YouTube",
										value: "Watch my content",
										href: youtube,
									},
									{ icon: "💻", label: "GitHub", value: "See my code", href: github },
								].map((item, i) => (
									<div
										key={i}
										className="group flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 hover:-translate-y-1"
										style={{
											backgroundColor: "rgba(255, 255, 255, 0.05)",
											border: `1px solid ${primaryColor}20`,
										}}
									>
										<span className="text-2xl">{item.icon}</span>
										<div>
											<p className="text-sm font-medium opacity-70">{item.label}</p>
											{item.href ? (
												<a
													href={item.href}
													target="_blank"
													rel="noopener noreferrer"
													className="font-medium hover:underline"
													style={{ color: primaryColor }}
												>
													{item.value}
												</a>
											) : (
												<p className="font-medium">{item.value}</p>
											)}
										</div>
									</div>
								))}
							</div>

							{/* Contact Form */}
							<div>
								<form className="space-y-6">
									{[
										{ label: "Name", type: "text", placeholder: "Your name" },
										{ label: "Email", type: "email", placeholder: "you@example.com" },
										{
											label: "Message",
											type: "textarea",
											placeholder: "Your message...",
										},
									].map((field, i) => (
										<div key={i}>
											<label className="block text-sm font-medium mb-2 opacity-70">
												{field.label}
											</label>
											{field.type === "textarea" ? (
												<textarea
													className="w-full px-4 py-3 rounded-lg backdrop-blur-sm transition-all duration-300 focus:ring-2"
													style={{
														backgroundColor: "rgba(255, 255, 255, 0.05)",
														border: `1px solid ${primaryColor}20`,
													}}
													rows={5}
													placeholder={field.placeholder}
												/>
											) : (
												<input
													type={field.type}
													className="w-full px-4 py-3 rounded-lg backdrop-blur-sm transition-all duration-300 focus:ring-2"
													style={{
														backgroundColor: "rgba(255, 255, 255, 0.05)",
														border: `1px solid ${primaryColor}20`,
													}}
													placeholder={field.placeholder}
												/>
											)}
										</div>
									))}

									<button
										type="submit"
										className="w-full py-4 rounded-lg font-medium relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
										style={{
											background: `linear-gradient(45deg, ${primaryColor || "#000"}, ${
												secondaryColor || "#444"
											})`,
										}}
									>
										<span className="relative z-10 text-white">Send Message</span>
										<div
											className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
											style={{
												background: `linear-gradient(45deg, ${secondaryColor || "#444"}, ${
													primaryColor || "#000"
												})`,
											}}
										/>
									</button>
								</form>
							</div>
						</div>
					</div>
				</section>
			)}

			{/* FOOTER */}
			<footer className="relative overflow-hidden">
				{/* Decorative shapes */}
				<div
					className="absolute inset-0 opacity-10"
					style={{
						background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)`,
					}}
				/>

				<div className="relative z-10">
					{/* Top section with navigation */}
					<div
						className="py-12 backdrop-blur-sm"
						style={{
							backgroundColor: "rgba(0, 0, 0, 0.8)",
						}}
					>
						<div className="max-w-6xl mx-auto px-8">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								{/* Brand column */}
								<div className="space-y-4">
									<div className="flex items-center space-x-3">
										{logo && (
											<img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
										)}
										<h3 className="text-xl font-bold" style={{ color: primaryColor }}>
											{name}
										</h3>
									</div>
									<p className="text-sm w-2/3" style={{ color: "white" }}>
										Crafting digital experiences with passion and precision
									</p>
								</div>

								{/* Quick links */}
								<div>
									<h4 className="font-semibold mb-4" style={{ color: "white" }}>
										Quick Links
									</h4>
									<ul className="space-y-2">
										{[
											{ label: "Home", href: "#welcome", active: welcome.active },
											{ label: "About", href: "#about", active: about.active },
											{ label: "Projects", href: "#projects", active: projects.active },
											{ label: "Contact", href: "#contact", active: contact.active },
										].map(
											(link) =>
												link.active && (
													<li key={link.href}>
														<a
															href={link.href}
															className="text-sm hover:-translate-y-0.5 transition-transform inline-block"
															style={{ color: "white" }}
														>
															{link.label}
														</a>
													</li>
												)
										)}
									</ul>
								</div>

								{/* Social links */}
								<div>
									<h4 className="font-semibold mb-4" style={{ color: secondaryColor }}>
										Connect
									</h4>
									<div className="flex space-x-4">
										{[
											{ icon: "💼", href: linkedin },
											{ icon: "📺", href: youtube },
											{ icon: "💻", href: github },
										].map(
											(social) =>
												social.href && (
													<a
														key={social.href}
														href={social.href}
														target="_blank"
														rel="noopener noreferrer"
														className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:-translate-y-1"
														style={{
															background: `linear-gradient(45deg, ${primaryColor || "#000"}, ${
																secondaryColor || "#444"
															})`,
														}}
													>
														<span className="text-white text-lg">{social.icon}</span>
													</a>
												)
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Bottom section with copyright */}
					<div
						className="py-4 text-center text-sm"
						style={{
							backgroundColor: "rgba(0, 0, 0, 0.9)",
							color: "white",
						}}
					>
						<div className="max-w-6xl mx-auto px-8">
							<p>
								© {new Date().getFullYear()} {name}. All rights reserved.{" "}
								<span className="inline-block">
									Crafted with{" "}
									<span
										className="inline-block animate-pulse"
										style={{ color: primaryColor }}
									>
										♥
									</span>
								</span>
							</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Portfolio;
