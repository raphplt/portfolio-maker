export interface PortfolioProps {
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
	projects: {
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
