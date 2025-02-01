"use client";
import { Button } from "@heroui/react";
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
			<Button href="/" className="mt-4">
				Retour
			</Button>
			<h1 className="pt-20 text-xl font-semibold ml-4">Nouveau portfolio</h1>
			<div className="flex flex-row items-center justify-center w-10/12 mx-auto space-x-4">
				{templates.map((template, index) => (
					<Link
						key={index}
						href={`/portfolios/new/${template}`}
						className="w-96 h-48 rounded-lg p-2 border flex items-center justify-center bg-gradient-to-r from-primary-200 to-primary-500"
					>
						<span className="font-semibold">{template}</span>
					</Link>
				))}
			</div>
		</main>
	);
};

export default New;