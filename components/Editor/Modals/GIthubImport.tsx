import { useFormContext } from "@/context/FormContext";
import {
	Button,
	Card,
	CardBody,
	Checkbox,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { fetchGithubProjects } from "@/utils/fetch";

const GithubImport = () => {
	const { handleChange, handleSave, templateData } = useFormContext();
	const { onOpen, isOpen, onOpenChange } = useDisclosure();
	const { data: session } = useSession();

	const [projects, setProjects] = useState<
		{ title: string; description: string; link: string }[]
	>([]);
	const [hasFetchedProjects, setHasFetchedProjects] = useState(false);
	const [selectedProjects, setSelectedProjects] = useState<
		{ title: string; description: string; link: string }[]
	>([]);

	const handleSubmit = () => {
		handleChange("projectList", [
			...templateData.projectList,
			...selectedProjects,
		]);
		handleSave();
		onOpenChange();
	};

	const handleProjectSelection = (project: {
		title: string;
		description: string;
		link: string;
	}) => {
		setSelectedProjects((prevSelectedProjects) => {
			if (prevSelectedProjects.includes(project)) {
				return prevSelectedProjects.filter((p) => p !== project);
			} else {
				return [...prevSelectedProjects, project];
			}
		});
	};

	useEffect(() => {
		if (session && session.accessToken && !hasFetchedProjects) {
			fetchGithubProjects(
				session.accessToken as string,
				setProjects,
				setHasFetchedProjects,
				session
			);
		}
	}, [session, session?.accessToken, hasFetchedProjects]);

	const len = selectedProjects.length;

	return (
		<>
			<Button
				onPress={onOpen}
				endContent={<Icon icon="akar-icons:github-fill" width={20} />}
				className="bg-black text-white w-full"
			>
				Importer depuis GitHub
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				size="2xl"
				className="h-[80vh] w-[80vw]"
				scrollBehavior="inside"
			>
				<ModalContent>
					<ModalHeader>
						<h1 className="text-2xl font-bold text-center text-primary">
							Choisissez les projets à importer
						</h1>
					</ModalHeader>

					<ModalBody className="">
						<div className="flex flex-col space-y-2">
							{projects.map((project, index) => (
								<Card key={index} className="">
									<CardBody>
										<div className="flex items-center justify-between">
											<h2 className="font-semibold">{project.title}</h2>
											<Checkbox
												checked={selectedProjects.includes(project)}
												onChange={() => handleProjectSelection(project)}
											/>
										</div>
										<p>{project.description}</p>
										<a href={project.link} target="_blank" rel="noopener noreferrer">
											{project.link}
										</a>
									</CardBody>
								</Card>
							))}
						</div>
					</ModalBody>
					<ModalFooter className="flex justify-between items-center">
						<p>
							{len
								? "Vous avez sélectionné " + len + " projet" + (len > 1 ? "s" : "")
								: "Aucun projet sélectionné"}
						</p>
						<Button
							onPress={handleSubmit}
							color={len ? "primary" : "default"}
							disabled={!len}
							isDisabled={!len}
						>
							Importer les projets sélectionnés
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default GithubImport;
