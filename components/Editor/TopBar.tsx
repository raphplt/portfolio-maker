"use client";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import SessionPopover from "../Shared/SessionPopover";

type TopBarProps = {
	zoom: number;
	increaseZoom: () => void;
	decreaseZoom: () => void;
};

const TopBar = ({ zoom, increaseZoom, decreaseZoom }: TopBarProps) => {
	return (
		<header className="fixed top-0 left-0 right-0 bg-gray-50 shadow z-50 w-full mx-auto rounded-lg">
			<div className="container mx-auto px-2 py-3 flex justify-between items-center">
				<div className="flex items-center space-x-6">
					<Link href="/">
						<Image src={"/Logo.png"} alt="Logo" width={32} height={32} />
					</Link>

					<Link className="font-bold text-lg text-black" href="/">
						Portfolio Maker
					</Link>
					<Button
						as={Link}
						href="/portfolios/new"
						className="text-default-700 font-semibold"
						size="sm"
						startContent={<Icon icon="bx:bx-arrow-back" width={18} />}
					>
						Retour
					</Button>
				</div>
				<div className="flex items-center space-x-4">
					<Button color="primary" size="sm">
						Plein écran
					</Button>
					<Button color="secondary" size="sm">
						Exporter
					</Button>
					<div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-xl">
						<Button onPress={decreaseZoom} size="sm" color="warning" isIconOnly>
							<Icon icon="bx:bx-minus" width={16} />
						</Button>
						<span className="font-semibold text-sm">{Math.round(zoom * 100)}%</span>
						<Button onPress={increaseZoom} size="sm" color="warning" isIconOnly>
							<Icon icon="bx:bx-plus" width={16} />
						</Button>
					</div>
					<SessionPopover />
				</div>
			</div>
		</header>
	);
};

export default TopBar;
