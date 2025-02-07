import React from "react";
import { Accordion, AccordionItem, Input, Textarea } from "@heroui/react";
import { TemplateData } from "@/app/portfolios/new/[id]/helper";

type InfosFormProps = {
	templateData: TemplateData;
	handleChange: (field: keyof TemplateData, value: string) => void;
};

const InfosForm = ({ templateData, handleChange }: InfosFormProps) => {
	return (
		<Accordion
			defaultExpandedKeys={["1", "2", "3", "4"]}
			selectionMode="multiple"
		>
			<AccordionItem title="Informations générales" key={1}>
				<div className="flex flex-col space-y-2 w-full">
					<Input
						id="name"
						placeholder="Nom"
						label="Nom"
						type="text"
						variant="bordered"
						value={templateData.informations.name}
						onChange={(e) => handleChange("informations.name", e.target.value)}
						isClearable
						onClear={() => handleChange("informations.name", "")}
					/>
					<Input
						id="description"
						label="Description"
						placeholder="Description"
						variant="bordered"
						isClearable
						onClear={() => handleChange("informations.description", "")}
						type="text"
						value={templateData.informations.description}
						onChange={(e) => handleChange("informations.description", e.target.value)}
					/>
					<Textarea
						id="biography"
						label="Biographie"
						placeholder="Biographie"
						variant="bordered"
						value={templateData.informations.biography}
						onChange={(e) => handleChange("informations.biography", e.target.value)}
						rows={4}
						isClearable
						onClear={() => handleChange("informations.biography", "")}
					/>
					<Input
						id="welcomeTitle"
						label="Titre de bienvenue"
						placeholder="Titre de bienvenue"
						type="text"
						variant="bordered"
						value={templateData.informations.welcomeTitle}
						onChange={(e) =>
							handleChange("informations.welcomeTitle", e.target.value)
						}
						isClearable
						onClear={() => handleChange("informations.welcomeTitle", "")}
					/>
				</div>
			</AccordionItem>
			<AccordionItem title="Titres de sections" key={2}>
				<div className="flex flex-col space-y-2 w-full">
					<Input
						id="ctaButtonText"
						label="Texte du bouton CTA"
						placeholder="Texte du bouton CTA"
						type="text"
						variant="bordered"
						value={templateData.informations.ctaButtonText}
						onChange={(e) =>
							handleChange("informations.ctaButtonText", e.target.value)
						}
						isClearable
						onClear={() => handleChange("informations.ctaButtonText", "")}
					/>
					<Input
						id="projectsTitle"
						label="Titre de section Projets"
						placeholder="Titre de section Projets"
						type="text"
						variant="bordered"
						value={templateData.sections.projects.title}
						onChange={(e) => handleChange("sections.projects.title", e.target.value)}
						isClearable
						onClear={() => handleChange("sections.projects.title", "")}
					/>
					<Input
						id="aboutTitle"
						label="Titre de section À Propos"
						placeholder="Titre de section À Propos"
						type="text"
						variant="bordered"
						value={templateData.sections.about.title}
						onChange={(e) => handleChange("sections.about.title", e.target.value)}
						isClearable
						onClear={() => handleChange("sections.about.title", "")}
					/>
					<Input
						id="contactTitle"
						label="Titre de section Contact"
						placeholder="Titre de section Contact"
						type="text"
						variant="bordered"
						value={templateData.sections.contact.title}
						onChange={(e) => handleChange("sections.contact.title", e.target.value)}
						isClearable
						onClear={() => handleChange("sections.contact.title", "")}
					/>
				</div>
			</AccordionItem>
			<AccordionItem title="Contact" key={3}>
				<div className="flex flex-col space-y-2 w-full">
					<Input
						id="email"
						label="Email"
						placeholder="Email"
						type="email"
						variant="bordered"
						value={templateData.contact.email}
						onChange={(e) => handleChange("contact.email", e.target.value)}
						isClearable
						onClear={() => handleChange("contact.email", "")}
					/>
					<Input
						id="phone"
						label="Téléphone"
						placeholder="Téléphone"
						type="tel"
						variant="bordered"
						defaultValue={templateData.contact.phone}
						onChange={(e) => handleChange("contact.phone", e.target.value)}
						isClearable
						onClear={() => handleChange("contact.phone", "")}
					/>
					<Input
						id="linkedin"
						label="LinkedIn"
						placeholder="LinkedIn"
						type="url"
						variant="bordered"
						defaultValue={templateData.contact.linkedin}
						onChange={(e) => handleChange("contact.linkedin", e.target.value)}
						isClearable
						onClear={() => handleChange("contact.linkedin", "")}
					/>
					<Input
						id="youtube"
						label="YouTube"
						placeholder="YouTube"
						type="url"
						variant="bordered"
						defaultValue={templateData.contact.youtube}
						onChange={(e) => handleChange("contact.youtube", e.target.value)}
						isClearable
						onClear={() => handleChange("contact.youtube", "")}
					/>
					<Input
						id="github"
						label="GitHub"
						placeholder="GitHub"
						type="url"
						variant="bordered"
						defaultValue={templateData.contact.github}
						onChange={(e) => handleChange("contact.github", e.target.value)}
						isClearable
						onClear={() => handleChange("contact.github", "")}
					/>
				</div>
			</AccordionItem>
		</Accordion>
	);
};

export default InfosForm;