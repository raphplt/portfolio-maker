import { useFormContext } from "@/contexts/FormContext";
import { Switch } from "@heroui/react";

const DisplayForm = () => {
	const { handleChange, templateData } = useFormContext();

	return (
		<>
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
