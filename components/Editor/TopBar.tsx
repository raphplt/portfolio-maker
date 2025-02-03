"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import SessionPopover from "../Shared/SessionPopover";
import { Button } from "@heroui/react";
import { MenusType } from "@/app/portfolios/new/[id]/helper";
import { Icon } from "@iconify/react/dist/iconify.js";

type TopBarProps = {
	menuSelected: MenusType;
	setMenuSelected: (menu: MenusType) => void;
};

const TopBar = ({ menuSelected, setMenuSelected }: TopBarProps) => {
	return (
		<header className="fixed top-0 left-0 right-0 bg-gray-100 shadow z-50 w-full mx-auto rounded-b-lg">
			<div className=" px-10 py-3 flex justify-between items-center">
				<div className="flex items-center space-x-4">
					<Button size="sm" isIconOnly>
						<Icon icon="mdi:menu" width={20} />
					</Button>
					<Link href="/" className="flex items-center space-x-4 cursor-pointer">
						<Image src={"/Logo.png"} alt="Logo" width={32} height={32} />
						<span className="font-bold text-black">Portfolio Maker</span>
					</Link>
				</div>
				<div className="flex items-center space-x-5">
					<Button
						size="sm"
						startContent={<Icon icon="eva:info-outline" />}
						onPress={() => setMenuSelected("infos")}
						style={
							menuSelected === "infos"
								? { backgroundColor: "#4F46E5", color: "#fff" }
								: {}
						}
					>
						Informations
					</Button>
					<Button
						size="sm"
						startContent={<Icon icon="eva:color-palette-outline" />}
						onPress={() => setMenuSelected("colors")}
						style={
							menuSelected === "colors"
								? { backgroundColor: "#4F46E5", color: "#fff" }
								: {}
						}
					>
						Couleurs
					</Button>

					<SessionPopover />
				</div>
			</div>
		</header>
	);
};

export default TopBar;
