"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Divider,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	useDisclosure,
} from "@heroui/react";
import { MenusType } from "@/app/portfolios/new/[id]/helper";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import SessionPopover from "../Shared/SessionPopover";

type TopBarProps = {
	menuSelected: MenusType;
	setMenuSelected: (menu: MenusType) => void;
};

const TopBar = ({ menuSelected, setMenuSelected }: TopBarProps) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [templates, setTemplates] = useState<string[]>([]);

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
				<div className=" px-10 py-3 flex justify-between items-center">
					<div className="flex items-center space-x-4">
						<Button size="sm" isIconOnly onPress={onOpen}>
							<Icon icon="mdi:menu" width={20} />
						</Button>
						<Link href="/" className="flex items-center space-x-4 cursor-pointer">
							<Image src={"/Logo.png"} alt="Logo" width={32} height={32} />
							<span className="font-bold text-black">Penfolio</span>
						</Link>
						<div className="flex items-center space-x-2 ">
							<Icon icon="mdi:chevron-right" width={20} />

							<h3 className=" font-semibold">
								{currentTemplate ? `${currentTemplate}` : "Choisir un template"}
							</h3>
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<Button
							startContent={<Icon icon="eva:info-outline" />}
							onPress={() => setMenuSelected("infos")}
							style={
								menuSelected === "infos"
									? { backgroundColor: "#1FACC8", color: "#fff" }
									: {}
							}
						>
							Informations
						</Button>
						<Button
							startContent={<Icon icon="eva:color-palette-outline" />}
							onPress={() => setMenuSelected("colors")}
							style={
								menuSelected === "colors"
									? { backgroundColor: "#1FACC8", color: "#fff" }
									: {}
							}
						>
							Couleurs
						</Button>
						<Button
							startContent={<Icon icon="eva:monitor-outline" />}
							onPress={() => setMenuSelected("display")}
							style={
								menuSelected === "display"
									? { backgroundColor: "#1FACC8", color: "#fff" }
									: {}
							}
						>
							Affichage
						</Button>
						<Divider orientation="vertical" className="h-6" />

						<SessionPopover />
					</div>
				</div>
			</header>

			<Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left">
				<DrawerContent>
					{(onClose) => (
						<>
							<DrawerHeader className="flex flex-col gap-1">
								<Link href="/" className="flex items-center space-x-4 cursor-pointer">
									<Image src={"/Logo.png"} alt="Logo" width={32} height={32} />
									<span className="font-bold text-black">Penfolio</span>
								</Link>
							</DrawerHeader>
							<DrawerBody>
								<Button
									startContent={<Icon icon="mdi:arrow-left" />}
									as={Link}
									href="/portfolios/new"
								>
									Retour
								</Button>
								{templates.map((template, index) => (
									<Card
										key={index}
										as={Link}
										isHoverable
										href={`/portfolios/new/${template}`}
										className="bg-transparent overflow-hidden transform transition-all hover:scale-95 duration-300  hover:shadow-lgl"
									>
										<CardHeader
											className=" text-white p-3 text-center font-semibold"
											style={{
												backgroundColor:
													currentTemplate === template ? "#1FACC8" : "#BF8733",
											}}
										>
											{template}
										</CardHeader>
										<CardBody className="p-0">
											<Image
												src={`/templates/${template}.png`}
												width={500}
												height={500}
												alt={template}
												className="w-full h-32 object-cover pointer-events-none"
											/>
										</CardBody>
									</Card>
								))}
							</DrawerBody>
							<DrawerFooter>
								<Button color="danger" variant="ghost" onPress={onClose}>
									Fermer
								</Button>
							</DrawerFooter>
						</>
					)}
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default TopBar;
