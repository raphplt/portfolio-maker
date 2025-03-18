"use client";
import { Link } from "@heroui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import SessionPopover from "../Shared/SessionPopover";

const Header = () => {
	const pathname = usePathname();

	if (pathname.startsWith("/auth")) {
		return null;
	}

	return (
		<header className="flex items-center justify-between py-2 h-16 px-12 fixed top-0 left-0 w-full bg-white/40 backdrop-blur-xl border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] z-50 rounded-b-xl">
			<Link
				className="font-bold text-lg text-black flex flex-row gap-x-4"
				href="/"
			>
				<Image src={"/Logo.png"} alt="Logo" width={32} height={32} />
				Penfolio
			</Link>
			<nav className="space-x-6 flex items-center">
				<Link as={Link} href="/" className="text-default-800 font-semibold">
					Accueil
				</Link>

				<Link
					as={Link}
					href="/portfolios/new"
					className="text-default-800 font-semibold"
				>
					Nouveau portfolio
				</Link>

				<Link
					as={Link}
					href="/discover"
					className="text-default-800 font-semibold"
					isDisabled
				>
					Découvrir
				</Link>
				<SessionPopover />
			</nav>
		</header>
	);
};

export default Header;