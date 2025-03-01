import {
	Button,
	Divider,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export type BottomSideBarProps = {
	goFullScreen: () => void;
	exportTemplate: () => void;
	setZoom: React.Dispatch<React.SetStateAction<number>>;

	zoom: number;
};

const BottomSideBar = ({
	goFullScreen,
	exportTemplate,
	setZoom,
	zoom,
}: BottomSideBarProps) => {
	const decreaseZoom = () => {
		setZoom((prev: number) => Math.max(prev - 0.1, 0.5));
	};

	const increaseZoom = () => {
		setZoom((prev: number) => Math.min(prev + 0.1, 2));
	};

	return (
		<div className="flex items-center flex-col space-y-2">
			<Divider />
			<div className="flex space-x-2">
				<Button
					color="primary"
					size="sm"
					onPress={goFullScreen}
					startContent={<Icon icon="bx:bx-fullscreen" width={18} />}
					variant="ghost"
				>
					Plein écran
				</Button>
				<Popover backdrop="opaque">
					<PopoverTrigger>
						<Button
							color="secondary"
							size="sm"
							onPress={exportTemplate}
							startContent={<Icon icon="material-symbols:download" width={18} />}
							variant="ghost"
						>
							Exporter
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-3">
						<h2 className="font-semibold mb-2 text-[16px]">
							Exportez votre template
						</h2>
						<Button
							color="primary"
							size="sm"
							onPress={exportTemplate}
							startContent={<Icon icon="flowbite:html-solid" width={18} />}
						>
							Exporter en HTML
						</Button>
					</PopoverContent>
				</Popover>
			</div>
			<div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-xl">
				<Button onPress={() => setZoom(1)} size="sm" color="warning" isIconOnly>
					<Icon icon="mdi:restart" width={16} />
				</Button>
				<Button onPress={decreaseZoom} size="sm" color="warning" isIconOnly>
					<Icon icon="bx:bx-minus" width={16} />
				</Button>
				<span className="font-semibold text-sm">{Math.round(zoom * 100)}%</span>
				<Button onPress={increaseZoom} size="sm" color="warning" isIconOnly>
					<Icon icon="bx:bx-plus" width={16} />
				</Button>
			</div>
		</div>
	);
};

export default BottomSideBar;
