"use client";
import { useSessionContext } from "@/context/SessionProvider";
import React from "react";
import CardPortfolio from "./CardPortfolio";

const Account = () => {
	const { usersTemplates, setUsersTemplates } = useSessionContext();

	const handleDelete = () => {
		setUsersTemplates([...usersTemplates]);
	};

	return (
		<main className="h-screen flex flex-col items-center mt-24">
			<h1 className="text-3xl font-bold mb-4">Mes portfolios </h1>

			<div className="grid grid-cols-3 gap-4">
				{usersTemplates &&
					usersTemplates.map((template) => (
						<CardPortfolio
							key={template.id}
							template={template}
							onDelete={handleDelete}
						/>
					))}
			</div>
		</main>
	);
};

export default Account;
