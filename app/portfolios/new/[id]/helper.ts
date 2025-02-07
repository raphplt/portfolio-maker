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
	informations: {
		name: string;
		description: string;
		biography: string;
		welcomeTitle: string;
		ctaButtonText: string;
		logo: string;
		profilePicture: string;
	};
	sections: {
		welcome: {
			title: string;
			description: string;
			active: boolean;
		};
		about: {
			title: string;
			description: string;
			active: boolean;
		};
		projects: {
			title: string;
			description: string;
			active: boolean;
		};
		testimonials: {
			title: string;
			description: string;
			active: boolean;
		};
		contact: {
			title: string;
			description: string;
			active: boolean;
		};
	};
	projectList: {
		title: string;
		description: string;
		link: string;
	}[];
	contact: {
		email?: string;
		phone?: string;
		linkedin?: string;
		youtube?: string;
		github?: string;
	};
	theme: {
		primaryColor: string;
		secondaryColor: string;
		tertiaryColor: string;
		backgroundColor: string;
		backgroundColorSecondary: string;
		textColor: string;
		textColorSecondary: string;
	};
}

export type TemplateDataKey =
	| keyof TemplateData
	| `theme.${keyof TemplateData["theme"]}`;

export const templateDefaultData: TemplateData = {
	informations: {
		name: "Mon Portfolio",
		description: "Bienvenue  sur mon portfolio personnel.",
		biography:
			"Je suis un développeur passionné par la création de solutions web innovantes.",
		welcomeTitle: "Bienvenue sur mon Portfolio",
		ctaButtonText: "Découvrir mes projets",
		logo: "path/to/logo.png",
		profilePicture: "path/to/profilePicture.png",
	},
	sections: {
		welcome: {
			title: "Bienvenue",
			description: "Bienvenue sur mon portfolio.",
			active: true,
		},
		about: {
			title: "À Propos",
			description: "En savoir plus sur moi.",
			active: true,
		},
		projects: {
			title: "Mes Projets",
			description: "Découvrez mes projets.",
			active: true,
		},
		testimonials: {
			title: "Témoignages",
			description: "Ce que les gens disent de moi.",
			active: true,
		},
		contact: {
			title: "Contact",
			description: "Contactez-moi.",
			active: true,
		},
	},
	projectList: [],
	contact: {
		email: "email@example.com",
		phone: "0123456789",
		linkedin: "https://linkedin.com",
		youtube: "https://youtube.com",
		github: "https://github.com",
	},
	theme: {
		primaryColor: "#ff5733",
		secondaryColor: "#33c4ff",
		tertiaryColor: "#ff33a1",
		backgroundColor: "#ffffff",
		backgroundColorSecondary: "#f0f0f0",
		textColor: "#000000",
		textColorSecondary: "#333333",
	},
};

export type ComponentProps = TemplateDataKey;

export type MenusType = "infos" | "colors" | "display";

export enum Menus {
	INFOS = "infos",
	COLORS = "colors",
	DISPLAY = "display",
}