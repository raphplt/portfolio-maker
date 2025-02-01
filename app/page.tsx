"use client";
import { Button } from "@heroui/react";
import React from "react";
import { Icon } from "@iconify/react";

const Home = () => {
	return (
		<main className="flex flex-col items-center justify-center h-screen space-y-12">
			<h1 className="text-6xl font-bold">Bienvenue sur Portfolio Maker</h1>
			<h2 className="text-4xl font-semibold text-default-700">
				Créez votre portfolio en quelques minutes
			</h2>

			<Button
				color="primary"
				size="lg"
				endContent={<Icon icon="akar-icons:arrow-right" />}
			>
				Commencer
			</Button>
		</main>
	);
};

export default Home;
