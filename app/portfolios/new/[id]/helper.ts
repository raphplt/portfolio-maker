export interface Repository {
	name: string;
	description: string;
	html_url: string;
	fork?: boolean;
	archived?: boolean;
	private?: boolean;
	owner: { login: string };
	updated_at: string;
}

export interface TemplateData {
	// Éléments textuels principaux
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

export const templateDefaultData: TemplateData = {
	name: "Mon Portfolio",
	description: "Bienvenue sur mon portfolio personnel.",
	biography:
		"Je suis un développeur passionné par la création de solutions web innovantes.",
	welcomeTitle: "Bienvenue sur mon Portfolio",
	ctaButtonText: "Découvrir mes projets",
	projectsTitle: "Mes Projets",
	aboutTitle: "À Propos",
	contactTitle: "Contact",
	projects: [],
	contact: {
		email: "email@example.com",
		phone: "0123456789",
		linkedin: "https://linkedin.com",
	},
	theme: {
		primaryColor: "#ff5733",
		secondaryColor: "#33c4ff",
		backgroundColor: "#ffffff",
		textColor: "#000000",
	},
};

export type ComponentProps = TemplateData;

export type MenusType = "infos" | "colors";
