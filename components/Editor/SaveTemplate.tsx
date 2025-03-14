import React from "react";
import { useFormContext } from "@/context/FormContext";
import { api_url } from "@/utils/fetch";
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
	currentTemplate?: string;
};

const SaveTemplate = ({ currentTemplate }: Props) => {
	const { templateData, handleChange } = useFormContext();

	const handleSave = async () => {
		try {
			if (currentTemplate) {
				const response = await fetch(
					api_url + "/users-templates/" + currentTemplate,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(templateData),
					}
				);
				if (!response.ok) {
					throw new Error("Failed to save template");
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
				throw new Error("An error occurred while saving the template");
			}
		}
	};

	return (
		<div className="flex items-center space-x-2 ">
			{/* <Icon icon="mdi:chevron-right" width={20} /> */}

			<Input
				className=" font-semibold"
				variant="flat"
				value={templateData?.templateTitle}
				onChange={(e) => handleChange("templateTitle", e.target.value)}
			/>
			{/* {currentTemplate} */}
			<Button
				isIconOnly
				onPress={handleSave}
				color="primary"
				variant="ghost"
				size="sm"
			>
				<Icon icon="mdi:content-save" width={20} />
			</Button>
		</div>
	);
};

export default SaveTemplate;
