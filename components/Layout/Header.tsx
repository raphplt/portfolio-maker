"use client";
import { Button, Link } from "@heroui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import SessionPopover from "../Shared/SessionPopover";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";

const Header = () => {
	const pathname = usePathname();
	const { data: session } = useSession();

	if (pathname.startsWith("/portfolios/new") || pathname.startsWith("/auth")) {
		return null;
	}

	return (
		<header className="flex items-center justify-between py-4 px-12 fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md shadow-md z-50 rounded-b-xl">
			<Link
				className="font-bold text-lg text-black flex flex-row gap-x-4"
				href="/"
			>
				<Image src={"/Logo.png"} alt="Logo" width={32} height={32} />
				Penfolio
			</Link>
			<nav className="space-x-6 flex items-center">
				{/* <Link href="/" className="text-default-800 font-semibold">
					Accueil
				</Link> */}
				{session && (
					<Link
						href="/protected/portfolios"
						className="text-default-800 font-semibold"
					>
						Mes portfolios
					</Link>
				)}

				<Button
					as={Link}
					href="/portfolios/new"
					className="text-default-800 font-semibold"
					color="warning"
					endContent={<Icon icon="bx:bx-plus" width={20} />}
				>
					Nouveau portfolio
				</Button>
				<SessionPopover />
			</nav>
		</header>
	);
};

export default Header;