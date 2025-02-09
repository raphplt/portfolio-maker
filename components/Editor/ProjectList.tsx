import { useFormContext } from "@/contexts/FormContext";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const ProjectList = () => {
	const { templateData, handleChange, handleSave } = useFormContext();
	return (
		<div className="flex flex-col space-y-4 py-3">
			{templateData.projectList.map((project, index) => (
				<Card key={index}>
					<CardHeader className="flex justify-between items-center">
						<h2 className="font-semibold">{project.title}</h2>
						<Popover>
							<PopoverTrigger>
								<Button isIconOnly size="sm">
									<Icon icon="mage:dots" />
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<Button
									onPress={() => {
										handleChange(
											"projectList",
											templateData.projectList.filter((_, i) => i !== index)
										);
										handleSave();
									}}
									color="danger"
								>
									Supprimer
								</Button>
							</PopoverContent>
						</Popover>
					</CardHeader>
					<CardBody>
						<p>{project.description}</p>
						<a href={project.link}>Lien</a>
					</CardBody>
				</Card>
			))}
		</div>
	);
};

export default ProjectList;
