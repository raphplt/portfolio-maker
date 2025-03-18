"use client";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Modal,
	ModalHeader,
	useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TemplateData, templateDefaultData } from "./[id]/helper";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionProvider";

const New = () => {
	const [templates, setTemplates] = useState<string[]>([]);
	const router = useRouter();
	const { data: session } = useSession();
	const { refreshTemplates, usersTemplates } = useSessionContext();
	const { onOpen, onClose, isOpen } = useDisclosure();

	useEffect(() => {
		fetch("/api/portfolios")
			.then((response) => response.json())
			.then((data) => setTemplates(data));
	}, []);

	const onTemplateClick = async (template: string) => {
		console.log("usersTemplates:", usersTemplates);

		for (const userTemplate of usersTemplates) {
			if (userTemplate.templateName === template) {
				alert("Vous avez déjà un portfolio de ce type");
				return;
			}
		}

		if (!session) {
			router.push("/auth/signin");
			return;
		}

		if (usersTemplates.length >= 3) {
			alert("Vous avez atteint la limite de 3 portfolios");
			return;
		}

		const defaultConfig = templateDefaultData; //TODO custom
		if (!defaultConfig) {
			console.error("Aucune configuration définie pour ce template");
			return;
		}

		const userId = session?.user.id;
		const templateData = {
			...defaultConfig,
			templateName: template,
			templateTitle: "Nouveau portfolio " + template,
			userId,
		};

		try {
			const response = await fetch(
				process.env.NEXT_PUBLIC_NEST_API_URL + "/users-templates",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(templateData),
				}
			);
			if (!response.ok) {
				throw new Error("Erreur lors de la sauvegarde du template");
			}
			const savedTemplate: TemplateData = await response.json();

			await refreshTemplates();

			router.push(`/portfolios/edit/${savedTemplate.id}`);
		} catch (error) {
			console.error("Erreur:", error);
		}
	};

	return (
		<main className="min-h-screen bg-gradient-to-r from-deep-violet to-dark-cyan flex flex-col items-center p-8 space-y-8 ">
			<Button
				as={Link}
				href="/"
				className="mt-4 flex items-center gap-2 bg-english-violet text-white hover:bg-light-violet px-4 py-2 rounded-md"
			>
				<Icon icon="bx:bx-arrow-back" width={24} />
				Retour
			</Button>

			<h1 className="pt-8 text-3xl font-bold text-white text-center">
				Étape 1 : Choisissez un template
			</h1>

			<div className="gap-8 w-full max-w-7xl flex flex-wrap justify-center">
				{templates.map((template, index) => (
					<button key={index} onClick={() => onTemplateClick(template)}>
						<Card
							key={index}
							isHoverable
							className="bg-transparent overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
						>
							<CardHeader className="bg-earthy-gold text-white p-3 text-center font-semibold">
								{template}
							</CardHeader>
							<CardBody className="p-0">
								<Image
									src={`/templates/${template}.png`}
									width={500}
									height={500}
									alt={template}
									className="w-full h-56 object-cover"
								/>
							</CardBody>
						</Card>
					</button>
				))}
			</div>

			{/* Modale si maximum atteint */}
			{/* <Modal isOpen={isOpen} onClose={onClose}>
				<ModalHeader>
					<h2 className="text-xl font-bold">Maximum atteint</h2>
					<p className="text-default-700">
						Vous avez atteint la limite de 3 portfolios
					</p>
				</ModalHeader>
				<div className="flex justify-end gap-4">
					<Button as={Link} href="/protected/portfolios" color="primary">
						Voir mes portfolios
					</Button>
					<Button onPress={onClose} color="secondary">
						Fermer
					</Button>
				</div>
			</Modal> */}
		</main>
	);
};

export default New;
