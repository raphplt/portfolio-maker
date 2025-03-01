"use client";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TemplateData, templateDefaultData } from "./[id]/helper";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const New = () => {
	const [templates, setTemplates] = useState<string[]>([]);
	const router = useRouter();
	const { data: session } = useSession();

	useEffect(() => {
		fetch("/api/portfolios")
			.then((response) => response.json())
			.then((data) => setTemplates(data));
	}, []);

	const onTemplateClick = async (template: string) => {
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

			console.log("Template sauvegardé:", savedTemplate);
			router.push(`/portfolios/edit/${savedTemplate.id}`);
		} catch (error) {
			console.error("Erreur:", error);
		}
	};

	return (
		<main className="min-h-screen bg-gradient-to-r from-[#252477] to-[#2B8091] flex flex-col items-center p-8 space-y-8">
			<Button
				as={Link}
				href="/"
				className="mt-4 flex items-center gap-2 bg-[#433FD3] text-white hover:bg-[#7370D7] px-4 py-2 rounded-md"
			>
				<Icon icon="bx:bx-arrow-back" width={24} />
				Retour
			</Button>

			<h1 className="pt-8 text-3xl font-bold text-white text-center">
				Étape 1 : Choisissez un template
			</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl bg-transparent">
				{templates.map((template, index) => (
					<button key={index} onClick={() => onTemplateClick(template)}>
						<Card
							key={index}
							isHoverable
							// onPress={() => onTemplateClick(template)}
							className="bg-transparent overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
						>
							<CardHeader className="bg-[#BF8733] text-white p-3 text-center font-semibold">
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
		</main>
	);
};

export default New;
