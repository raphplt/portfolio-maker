"use client";
import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const New = () => {
	const [templates, setTemplates] = useState<string[]>([]);

	useEffect(() => {
		fetch("/api/portfolios")
			.then((response) => response.json())
			.then((data) => setTemplates(data));
	}, []);

	return (
		<main className="flex flex-col items-center justify-start w-full h-full space-y-8">
			<Button as={Link} href="/" className="mt-4">
				<Icon icon="bx:bx-arrow-back" width={24} />
				Retour
			</Button>
			<h1 className="pt-20 text-xl font-semibold ml-4 flex items-center justify-center gap-x-2">
				<Icon icon="bx:bx-plus" width={24} />
				Nouveau portfolio
			</h1>
			<div className="flex flex-row items-center justify-center w-10/12 mx-auto space-x-4">
				{templates.map((template, index) => (
					<Card
						key={index}
						as={Link}
						isHoverable
						href={`/portfolios/new/${template}`}
						className="w-96 h-48 rounded-lg p-2 border flex items-center justify-center"
					>
						<CardBody>
							<span className="font-semibold">{template}</span>
						</CardBody>
					</Card>
				))}
			</div>
		</main>
	);
};

export default New;