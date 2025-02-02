// Form.tsx
import { TemplateData } from "@/app/portfolios/new/[id]/helper";
import { Button, Textarea, Input } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

type FormProps = {
	templateData: {
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
	};
	handleChange: (field: keyof TemplateData, value: string) => void;
	handleSave: () => void;
	menuSelected: "infos" | "colors"; // nouvelle prop pour définir le menu sélectionné
};

const Form = ({
	templateData,
	handleChange,
	handleSave,
	menuSelected,
}: FormProps) => {
	return (
		<div>
			<h2 className="text-lg font-semibold mb-2">Édition du Portfolio</h2>
			{/* Affichage direct du formulaire sans bouton de toggle */}
			<div className="space-y-4 mt-4">
				{menuSelected === "infos" && (
					<>
						<div>
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
						</div>
						<div>
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
						</div>
						<div>
							<Textarea
								id="biography"
								label="Biographie"
								placeholder="Biographie"
								variant="bordered"
								value={templateData.biography}
								onChange={(e) => handleChange("biography", e.target.value)}
								rows={4}
							/>
						</div>
					</>
				)}

				{menuSelected === "colors" && (
					<>
						<div className="space-y-2">
							<label className="block font-semibold" htmlFor="primaryColor">
								Couleur principale
							</label>
							<Input
								id="primaryColor"
								type="color"
								value={templateData.theme.primaryColor}
								onChange={(e) => handleChange("primaryColor", e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<label className="block font-semibold" htmlFor="secondaryColor">
								Couleur secondaire
							</label>
							<Input
								id="secondaryColor"
								type="color"
								value={templateData.theme.secondaryColor}
								onChange={(e) => handleChange("secondaryColor", e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<label className="block font-semibold" htmlFor="backgroundColor">
								Couleur de fond
							</label>
							<Input
								id="backgroundColor"
								type="color"
								value={templateData.theme.backgroundColor}
								onChange={(e) => handleChange("backgroundColor", e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<label className="block font-semibold" htmlFor="textColor">
								Couleur du texte
							</label>
							<Input
								id="textColor"
								type="color"
								value={templateData.theme.textColor}
								onChange={(e) => handleChange("textColor", e.target.value)}
							/>
						</div>
					</>
				)}

				<Button
					onPress={handleSave}
					color="secondary"
					size="sm"
					endContent={<Icon icon="mdi:content-save" width={20} color="white" />}
				>
					Enregistrer
				</Button>
			</div>
		</div>
	);
};

export default Form;
