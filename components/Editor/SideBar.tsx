import React from "react";
import Form from "./Form";
import BottomSideBar from "./BottomSideBar";
import { useZoom } from "@/contexts/ZoomContext";

type SideBarProps = {
	exportTemplate: () => void;
};

const SideBar = ({ exportTemplate }: SideBarProps) => {
	const { zoom, setZoom, setFullScreen } = useZoom();

	const goFullScreen = () => {
		setZoom(1);
		setFullScreen((prev: boolean) => !prev);
	};

	return (
		<aside className="w-full md:w-64 bg-gray-100 p-4 border-l fixed right-0 top-20 h-[90%] flex flex-col rounded-l-xl">
			<div className="flex-1 overflow-auto">
				<Form />
			</div>
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
