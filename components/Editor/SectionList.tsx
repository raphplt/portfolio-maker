import { Menus } from "@/app/portfolios/new/[id]/helper";
import { Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect } from "react";
import SessionPopover from "../Shared/SessionPopover";
import { useFormContext } from "@/context/FormContext";

const SectionList = () => {
    const { menuSelected, setMenuSelected } = useFormContext();
				const [isSmallPC, setIsSmallPC] = useState(false); // Initial state à false

				useEffect(() => {
					setIsSmallPC(window.innerWidth < 1280);

					const handleResize = () => {
						setIsSmallPC(window.innerWidth < 1280);
					};

					window.addEventListener("resize", handleResize);
					return () => {
						window.removeEventListener("resize", handleResize);
					};
				}, []);

	return (
		<div className="flex items-center space-x-4">
			<Button
				startContent={<Icon icon="eva:info-outline" width={18} />}
				onPress={() => setMenuSelected(Menus.INFOS)}
				size={isSmallPC ? "sm" : "md"}
				style={
					menuSelected === Menus.INFOS
						? { backgroundColor: "#1FACC8", color: "#fff" }
						: {}
				}
			>
				Informations
			</Button>
			<Button
				startContent={<Icon icon="eva:color-palette-outline" width={18} />}
				onPress={() => setMenuSelected(Menus.COLORS)}
				size={isSmallPC ? "sm" : "md"}
				style={
					menuSelected === Menus.COLORS
						? { backgroundColor: "#1FACC8", color: "#fff" }
						: {}
				}
			>
				Couleurs
			</Button>
			<Button
				startContent={<Icon icon="tdesign:code" width={18} />}
				onPress={() => setMenuSelected(Menus.PROJECTS)}
				size={isSmallPC ? "sm" : "md"}
				style={
					menuSelected === Menus.PROJECTS
						? { backgroundColor: "#1FACC8", color: "#fff" }
						: {}
				}
			>
				Projets
			</Button>
			<Button
				startContent={<Icon icon="eva:monitor-outline" width={18} />}
				onPress={() => setMenuSelected(Menus.DISPLAY)}
				size={isSmallPC ? "sm" : "md"}
				style={
					menuSelected === Menus.DISPLAY
						? { backgroundColor: "#1FACC8", color: "#fff" }
						: {}
				}
			>
				Affichage
			</Button>
			<Divider orientation="vertical" className="h-6" />

			<SessionPopover />
		</div>
	);
};

export default SectionList;
