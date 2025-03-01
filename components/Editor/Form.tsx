import React from "react";
import ColorsForm from "./Forms/ColorsForm";
import InfosForm from "./Forms/InfosForm";
import DisplayForm from "./Forms/DisplayForm";
import ProjectsForm from "./Forms/ProjectsForm";
import { useFormContext } from "@/contexts/FormContext";
import { Menus } from "@/app/portfolios/new/[id]/helper";

const Form = () => {
	const { menuSelected } = useFormContext();

	const renderFormContent = () => {
		switch (menuSelected) {
			case Menus.INFOS:
				return <InfosForm />;
			case Menus.COLORS:
				return <ColorsForm />;
			case Menus.DISPLAY:
				return <DisplayForm />;
			case Menus.PROJECTS:
				return <ProjectsForm />;
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
			case Menus.PROJECTS:
				return "Projets";
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
