import {
	MenusType,
	TemplateData,
	TemplateDataKey,
} from "@/app/portfolios/new/[id]/helper";
import React from "react";
import Form from "./Form";
import BottomSideBar from "./BottomSideBar";
import { useZoom } from "@/Contexts/ZoomContext";

type SideBarProps = {
	isEditing: boolean;
	handleEditToggle: () => void;
	templateData: TemplateData;
	handleChange: (field: TemplateDataKey, value: string | boolean) => void;
	handleSave: () => void;

	menuSelected: MenusType;
	exportTemplate: () => void;
};

const SideBar = ({
	templateData,
	handleChange,
	menuSelected,
	exportTemplate,
}: SideBarProps) => {
	const { zoom, setZoom, setFullScreen } = useZoom();

	const goFullScreen = () => {
		setZoom(1);
		setFullScreen((prev: boolean) => !prev);
	};

	return (
		<aside className="w-full md:w-64 bg-gray-100 p-4 border-l fixed right-0 top-20 h-[90%] flex flex-col rounded-l-xl">
			{/* Zone scrollable pour le Form */}
			<div className="flex-1 overflow-auto">
				<Form
					templateData={templateData}
					handleChange={handleChange}
					menuSelected={menuSelected}
				/>
			</div>
			{/* Zone fixe pour le BottomSideBar */}
			<div className="mt-4">
				<BottomSideBar
					goFullScreen={goFullScreen}
					exportTemplate={exportTemplate}
					setZoom={setZoom}
					zoom={zoom}
				/>
			</div>
		</aside>
	);
};

export default SideBar;
