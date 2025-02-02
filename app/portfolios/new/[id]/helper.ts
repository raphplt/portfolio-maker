export const templateDefaultData = {
	name: "John Doe",
	description: "Développeur / Designer",
	biography:
		"Passionné par la création et le design, je réalise des projets innovants en alliant technologie et esthétique.",
	projects: [
		{
			title: "Projet Alpha",
			description: "Une application web moderne avec React et Node.js.",
			link: "https://github.com/johndoe/projet-alpha",
		},
		{
			title: "Projet Beta",
			description:
				"Une interface utilisateur intuitive conçue avec Figma et Tailwind.",
			link: "https://github.com/johndoe/projet-beta",
		},
		{
			title: "Projet Gamma",
			description:
				"Un projet innovant qui intègre l'IA pour améliorer l'expérience utilisateur.",
			link: "https://github.com/johndoe/projet-gamma",
		},
	],
	contact: {
		email: "contact@johndoe.com",
		phone: "+33 1 23 45 67 89",
		linkedin: "https://www.linkedin.com/in/johndoe",
	},
	testimonials: [
		{
			message:
				"John est un développeur talentueux et créatif. Il a su répondre à nos attentes et livrer un projet de qualité.",
			author: "Jane Smith, CEO de XYZ Corp",
		},
		{
			message:
				"Travailler avec John a été une expérience enrichissante. Son expertise et sa réactivité ont été très appréciées.",
			author: "Alice Johnson, Directrice de ABC Ltd",
		},
	],
	skills: ["React", "Node.js", "Figma", "Tailwind", "IA"],
	theme: {
		primaryColor: "#4F46E5",
		secondaryColor: "#10B981",
		backgroundColor: "#F3F4F6",
		textColor: "#1F2937",
	},
};

export interface TemplateData {
	name: string;
	description: string;
	biography: string;
	projects: { title: string; description: string; link: string }[];
	contact: { email: string; phone: string; linkedin: string };
	theme: {
		primaryColor: string;
		secondaryColor: string;
		backgroundColor: string;
		textColor: string;
	};
}

export interface ComponentProps {
	name: string;
	description: string;
	biography: string;
	projects: { title: string; description: string; link: string }[];
	contact: { email: string; phone: string; linkedin: string };
	theme: {
		primaryColor: string;
		secondaryColor: string;
		backgroundColor: string;
		textColor: string;
	};
}

export interface Repository {
	title: string;
	description: string;
	link: string;
	fork: boolean;
	archived: boolean;
	private: boolean;
	owner: { login: string };
	updated_at: string;
}

export type MenusType = "infos" | "colors";