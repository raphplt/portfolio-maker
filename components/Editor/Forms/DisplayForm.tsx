import { useFormContext } from "@/context/FormContext";
import { Switch } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

const DisplayForm = () => {
	const { handleChange, templateData } = useFormContext();

	return (
		<>
			<div className=" flex items-center space-x-2 p-1 rounded-lg bg-gray-200">
				<Icon
					icon="material-symbols:info"
					className="text-default-500"
					width={32}
				/>
				<p className="text-sm text-default-500">
					Choisissez quels sections de votre portfolio vous souhaitez afficher.
				</p>
			</div>
			<Switch
				isSelected={templateData.sections.about.active}
				onValueChange={(value) => handleChange("sections.about.active", value)}
			>
				À propos
			</Switch>
			<Switch
				isSelected={templateData.sections.projects.active}
				onValueChange={(value) => handleChange("sections.projects.active", value)}
			>
				Projets
			</Switch>
			<Switch
				isSelected={templateData.sections.testimonials.active}
				onValueChange={(value) =>
					handleChange("sections.testimonials.active", value)
				}
			>
				Témoignages
			</Switch>
			<Switch
				isSelected={templateData.sections.contact.active}
				onValueChange={(value) => handleChange("sections.contact.active", value)}
			>
				Contact
			</Switch>
		</>
	);
};

export default DisplayForm;
