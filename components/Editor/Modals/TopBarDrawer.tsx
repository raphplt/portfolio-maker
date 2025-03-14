import { useSessionContext } from "@/context/SessionProvider";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	Button,
	Card,
	CardHeader,
	CardBody,
	DrawerFooter,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	templates: string[];
	currentTemplate?: string;
};

const TopBarDrawer = ({
	isOpen,
	onOpenChange,
	templates,
	currentTemplate,
}: Props) => {
	const { usersTemplates } = useSessionContext();

	return (
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
								className="w-fit p-1"
							>
								Retour
							</Button>
							{usersTemplates.length ?? "0"} templates
							{templates.map((template, index) => (
								<Card
									key={index}
									as={Link}
									isHoverable
									href={`/portfolios/new/${template}`}
									className="bg-transparent overflow-hidden transform transition-all hover:scale-95 duration-300 hover:shadow-lgl"
								>
									<CardHeader
										className=" text-white p-2 text-center font-semibold text-sm"
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
	);
};

export default TopBarDrawer;
