import { TemplateData } from "@/app/portfolios/new/[id]/helper";
import React from "react";
import Form from "./Form";
import BottomSideBar from "./BottomSideBar";

type SideBarProps = {
	isEditing: boolean;
	handleEditToggle: () => void;
	templateData: TemplateData;
	handleChange: (field: keyof TemplateData, value: string) => void;
	handleSave: () => void;
	setFullScreen: () => void;
	increaseZoom: () => void;
	decreaseZoom: () => void;
	zoom: number;
	setZoom: React.Dispatch<React.SetStateAction<number>>;
	menuSelected: "infos" | "colors";
	exportTemplate: () => void;
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
	menuSelected,
	exportTemplate,
}: SideBarProps) => {
	const goFullScreen = () => {
		setZoom(1);
		setFullScreen();
	};

	return (
		<aside className="w-full md:w-64 bg-gray-100 p-4 border-l fixed right-0 top-20 h-[90%] overflow-auto rounded-lg flex flex-col justify-between">
			<Form
				templateData={templateData}
				handleChange={handleChange}
				handleSave={handleSave}
				menuSelected={menuSelected}
			/>
			<BottomSideBar
				goFullScreen={goFullScreen}
				exportTemplate={exportTemplate}
				setZoom={setZoom}
				increaseZoom={increaseZoom}
				decreaseZoom={decreaseZoom}
				zoom={zoom}
			/>
		</aside>
	);
};

export default SideBar;
