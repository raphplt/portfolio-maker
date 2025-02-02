// SideBar.tsx
import { TemplateData } from "@/app/portfolios/new/[id]/helper";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import Form from "./Form";

type SideBarProps = {
	isEditing: boolean;
	handleEditToggle: () => void;
	templateData: {
		name: string;
		description: string;
		biography: string;
		projects: { title: string; description: string; link: string }[];
		contact: { email: string; phone: string; linkedin: string };
		theme: {
			primaryColor: string;
			secondaryColor: string;
			backgroundColor: string;
			textColor: string;
		};
	};
	handleChange: (field: keyof TemplateData, value: string) => void;
	handleSave: () => void;
	setFullScreen: () => void;
	increaseZoom: () => void;
	decreaseZoom: () => void;
	zoom: number;
	setZoom: React.Dispatch<React.SetStateAction<number>>;
	menuSelected: "infos" | "colors"; // ajout de la prop
};

const SideBar = ({
	templateData,
	handleChange,
	handleSave,
	setFullScreen,
	increaseZoom,
	decreaseZoom,
	zoom,
	setZoom,
	menuSelected, // réception de la prop
}: SideBarProps) => {
	const goFullScreen = () => {
		setZoom(1);
		setFullScreen();
	};

	return (
		<aside className="w-full md:w-64 bg-gray-100 p-4 border-l fixed right-0 top-20 h-[88%] overflow-auto rounded-lg flex flex-col justify-between">
			{/* Passage de menuSelected au formulaire */}
			<Form
				templateData={templateData}
				handleChange={handleChange}
				handleSave={handleSave}
				menuSelected={menuSelected}
			/>

			<div className="flex items-center flex-col space-y-2">
				<div className="flex space-x-2">
					<Button
						color="primary"
						size="sm"
						onPress={goFullScreen}
						startContent={<Icon icon="bx:bx-fullscreen" width={18} />}
					>
						Plein écran
					</Button>
					<Button color="secondary" size="sm">
						Exporter
					</Button>
				</div>
				<div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-xl">
					<Button onPress={decreaseZoom} size="sm" color="warning" isIconOnly>
						<Icon icon="bx:bx-minus" width={16} />
					</Button>
					<span className="font-semibold text-sm">{Math.round(zoom * 100)}%</span>
					<Button onPress={increaseZoom} size="sm" color="warning" isIconOnly>
						<Icon icon="bx:bx-plus" width={16} />
					</Button>
				</div>
			</div>
		</aside>
	);
};

export default SideBar;
