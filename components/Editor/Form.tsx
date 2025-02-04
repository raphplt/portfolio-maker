import React from "react";
import { TemplateData } from "@/app/portfolios/new/[id]/helper";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ColorsForm from "./Forms/ColorsForm";
import InfosForm from "./Forms/InfosForm";

type FormProps = {
	templateData: TemplateData;
	handleChange: (field: keyof TemplateData, value: string) => void;
	handleSave: () => void;
	menuSelected: "infos" | "colors";
};

const Form = ({
	templateData,
	handleChange,
	handleSave,
	menuSelected,
}: FormProps) => {
	const renderFormContent = () => {
		switch (menuSelected) {
			case "infos":
				return (
					<InfosForm templateData={templateData} handleChange={handleChange} />
				);
			case "colors":
				return (
					<ColorsForm templateData={templateData} handleChange={handleChange} />
				);
			default:
				return null;
		}
	};

	return (
		<div>
			<h2 className="text-lg font-semibold mb-2">
				{menuSelected === "infos" ? "Informations" : "Couleurs"}
			</h2>
			<div className="space-y-4 mt-4">
				{renderFormContent()}
				<Button
					onPress={handleSave}
					color="secondary"
					className="w-full text-white"
					endContent={<Icon icon="mdi:content-save" width={20} color="white" />}
				>
					Enregistrer
				</Button>
			</div>
		</div>
	);
};

export default Form;
