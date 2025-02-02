"use client";
import { Link } from "@heroui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import SessionPopover from "../Shared/SessionPopover";

const Header = () => {
	const pathname = usePathname();

	if (pathname.startsWith("/portfolios/new")) {
		return null;
	}

	return (
		<div className="flex items-center justify-between py-4 px-12 fixed top-0 left-0 w-full bg-background shadow-md">
			<Link
				className="font-bold text-lg text-black flex flex-row gap-x-4"
				href="/"
			>
				<Image src={"/Logo.png"} alt="Logo" width={32} height={32} />
				Portfolio Maker
			</Link>
			<nav className="space-x-6 flex items-center">
				<Link href="/" className="text-default-700 font-semibold">
					Accueil
				</Link>

				<Link href="/portfolios/new" className="text-default-700 font-semibold">
					Nouveau portfolio
				</Link>
				<SessionPopover />
			</nav>
		</div>
	);
};

export default Header;
