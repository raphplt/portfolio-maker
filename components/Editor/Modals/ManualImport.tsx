import { useFormContext } from "@/context/FormContext";
import {
	Button,
	Form,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

const ManualImport = () => {
	const { handleChange, handleSave, templateData } = useFormContext();
	const { onOpen, isOpen, onOpenChange } = useDisclosure();

	const [project, setProject] = useState({
		title: "",
		description: "",
		link: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProject((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = () => {
		handleChange("projectList", [...templateData.projectList, project]);
		handleSave();
		onOpenChange();
	};

	return (
		<>
			<Button
				onPress={onOpen}
				endContent={<Icon icon="akar-icons:plus" />}
				color="primary"
				className="w-full"
			>
				Ajouter un projet
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
				<ModalContent>
					<ModalHeader>
						<h1 className="text-2xl font-bold text-center text-primary">
							Ajouter un projet manuellement
						</h1>
					</ModalHeader>
					<ModalBody>
						<Form>
							<Input
								type="text"
								name="title"
								placeholder="Title"
								value={project.title}
								onChange={handleInputChange}
							/>
							<Input
								type="text"
								name="description"
								placeholder="Description"
								value={project.description}
								onChange={handleInputChange}
							/>
							<Input
								type="text"
								name="link"
								placeholder="Link"
								value={project.link}
								onChange={handleInputChange}
							/>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button onPress={handleSubmit} color="primary">
							Ajouter
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ManualImport;
