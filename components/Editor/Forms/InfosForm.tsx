import React from "react";
import { Accordion, AccordionItem, Input, Textarea } from "@heroui/react";
import { TemplateData } from "@/app/portfolios/new/[id]/helper";

type InfosFormProps = {
	templateData: TemplateData;
	handleChange: (field: keyof TemplateData, value: string) => void;
};

const InfosForm = ({ templateData, handleChange }: InfosFormProps) => {
	return (
		<Accordion defaultExpandedKeys={["1", "2"]} selectionMode="multiple">
			<AccordionItem title="Informations générales" key={1}>
				<div className="flex flex-col space-y-2 w-full">
					<Input
						id="name"
						placeholder="Nom"
						label="Nom"
						type="text"
						variant="bordered"
						value={templateData.name}
						onChange={(e) => handleChange("name", e.target.value)}
						isClearable
						onClear={() => handleChange("name", "")}
					/>
					<Input
						id="description"
						label="Description"
						placeholder="Description"
						variant="bordered"
						isClearable
						onClear={() => handleChange("description", "")}
						type="text"
						value={templateData.description}
						onChange={(e) => handleChange("description", e.target.value)}
					/>
					<Textarea
						id="biography"
						label="Biographie"
						placeholder="Biographie"
						variant="bordered"
						value={templateData.biography}
						onChange={(e) => handleChange("biography", e.target.value)}
						rows={4}
					/>
					<Input
						id="welcomeTitle"
						label="Titre de bienvenue"
						placeholder="Titre de bienvenue"
						type="text"
						variant="bordered"
						value={templateData.welcomeTitle}
						onChange={(e) => handleChange("welcomeTitle", e.target.value)}
						isClearable
						onClear={() => handleChange("welcomeTitle", "")}
					/>
				</div>
			</AccordionItem>
			<AccordionItem title="Sections" key={2}>
				<div className="flex flex-col space-y-2 w-full">
					<Input
						id="ctaButtonText"
						label="Texte du bouton CTA"
						placeholder="Texte du bouton CTA"
						type="text"
						variant="bordered"
						value={templateData.ctaButtonText}
						onChange={(e) => handleChange("ctaButtonText", e.target.value)}
						isClearable
						onClear={() => handleChange("ctaButtonText", "")}
					/>
					<Input
						id="projectsTitle"
						label="Titre de section Projets"
						placeholder="Titre de section Projets"
						type="text"
						variant="bordered"
						value={templateData.projectsTitle}
						onChange={(e) => handleChange("projectsTitle", e.target.value)}
						isClearable
						onClear={() => handleChange("projectsTitle", "")}
					/>
					<Input
						id="aboutTitle"
						label="Titre de section À Propos"
						placeholder="Titre de section À Propos"
						type="text"
						variant="bordered"
						value={templateData.aboutTitle}
						onChange={(e) => handleChange("aboutTitle", e.target.value)}
						isClearable
						onClear={() => handleChange("aboutTitle", "")}
					/>
					<Input
						id="contactTitle"
						label="Titre de section Contact"
						placeholder="Titre de section Contact"
						type="text"
						variant="bordered"
						value={templateData.contactTitle}
						onChange={(e) => handleChange("contactTitle", e.target.value)}
						isClearable
						onClear={() => handleChange("contactTitle", "")}
					/>
				</div>
			</AccordionItem>
		</Accordion>
	);
};

export default InfosForm;
