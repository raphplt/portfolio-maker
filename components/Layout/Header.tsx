"use client";
import { Link } from "@heroui/react";
import React from "react";

const Header = () => {
	return (
		<div className="flex items-center justify-between py-4 px-12 fixed top-0 left-0 w-full bg-background shadow-md">
			<Link className="font-bold text-lg text-black" href="/">
				Portfolio Maker
			</Link>
			<nav className="space-x-6">
				<Link href="/" className="text-default-700 font-semibold">
					Accueil
				</Link>

				<Link href="/portfolios/new" className="text-default-700 font-semibold">
					Nouveau portfolio
				</Link>
			</nav>
		</div>
	);
};

export default Header;
