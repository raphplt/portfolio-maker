"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import TopBarDrawer from "./Modals/TopBarDrawer";
import SectionList from "./SectionList";
import SaveTemplate from "./SaveTemplate";
import DeployPortFolio from "./DeployPortFolio";
import { TemplateData } from "@/app/portfolios/new/[id]/helper";
import { useFormContext } from "@/context/FormContext";

const TopBar = ({
	Component,
}: {
	Component: React.ComponentType<TemplateData> | null;
}) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [templates, setTemplates] = useState<string[]>([]);
	const { templateData } = useFormContext();

	useEffect(() => {
		fetch("/api/portfolios")
			.then((response) => response.json())
			.then((data) => setTemplates(data));
	}, []);

	const path = usePathname();
	const currentTemplate = path.split("/").pop();

	return (
		<>
			<header className="fixed top-0 left-0 right-0 bg-gray-100 shadow z-50 w-full mx-auto rounded-b-lg">
				<div className="px-5 py-3 flex justify-between items-center">
					<div className="flex items-center space-x-4">
						<Button size="sm" isIconOnly onPress={onOpen}>
							<Icon icon="mdi:menu" width={20} />
						</Button>
						<Link href="/" className="flex items-center space-x-4 cursor-pointer">
							<Image src={"/Logo.png"} alt="Logo" width={32} height={32} />
						</Link>
						<SaveTemplate currentTemplate={currentTemplate} />
						<DeployPortFolio Component={Component} templateData={templateData} />
					</div>
					<SectionList />
				</div>
			</header>

			<TopBarDrawer
				templates={templates}
				currentTemplate={currentTemplate}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
		</>
	);
};

export default TopBar;
