// Form.tsx
import React from "react";
import {
	Menus,
	MenusType,
	TemplateData,
	TemplateDataKey,
} from "@/app/portfolios/new/[id]/helper";
import ColorsForm from "./Forms/ColorsForm";
import InfosForm from "./Forms/InfosForm";
import DisplayForm from "./Forms/DisplayForm";

type FormProps = {
	templateData: TemplateData;
	handleChange: (field: TemplateDataKey, value: string | boolean) => void;
	menuSelected: MenusType;
};

const Form = ({ templateData, handleChange, menuSelected }: FormProps) => {
	const renderFormContent = () => {
		switch (menuSelected) {
			case Menus.INFOS:
				return (
					<InfosForm templateData={templateData} handleChange={handleChange} />
				);
			case Menus.COLORS:
				return (
					<ColorsForm templateData={templateData} handleChange={handleChange} />
				);
			case Menus.DISPLAY:
				return (
					<DisplayForm templateData={templateData} handleChange={handleChange} />
				);
			default:
				return null;
		}
	};

	const renderTitle = () => {
		switch (menuSelected) {
			case Menus.INFOS:
				return "Informations générales";
			case Menus.COLORS:
				return "Couleurs";
			case Menus.DISPLAY:
				return "Affichage";
			default:
				return null;
		}
	};

	return (
		<div className="relative">
			<h2 className="text-lg font-semibold mb-2">{renderTitle()}</h2>
			<div className="space-y-4 mt-4">{renderFormContent()}</div>
		</div>
	);
};

export default Form;
