/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Input } from "@heroui/react";
import { TemplateData } from "@/app/portfolios/new/[id]/helper";

type ColorsFormProps = {
	templateData: TemplateData;
	handleChange: (field: keyof TemplateData, value: string) => void;
};

const ColorsForm = ({ templateData, handleChange }: ColorsFormProps) => {
	return (
		<>
			<div className="space-y-2">
				<label className="block font-semibold" htmlFor="primaryColor">
					Couleur principale
				</label>
				<Input
					id="primaryColor"
					type="color"
					value={templateData.theme.primaryColor}
					onChange={(e) => handleChange("primaryColor" as any, e.target.value)}
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
					onChange={(e) => handleChange("secondaryColor" as any, e.target.value)}
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
					onChange={(e) => handleChange("backgroundColor" as any, e.target.value)}
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
					onChange={(e) => handleChange("textColor" as any, e.target.value)}
				/>
			</div>
		</>
	);
};

export default ColorsForm;
