"use client";
import { Link } from "@heroui/react";
import React from "react";

const Header = () => {
	return (
		<div className="flex items-center justify-between py-4 px-12 fixed top-0 left-0 w-full bg-background shadow-md">
			<span className="font-bold text-lg">Portfolio Maker</span>
			<nav className="space-x-6">
				<Link href="/" className="text-black">
					Home
				</Link>

				<Link href="/about" className="text-black">
					About
				</Link>
			</nav>
		</div>
	);
};

export default Header;
