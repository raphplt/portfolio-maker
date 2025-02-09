"use client";
import { useSessionContext } from "@/contexts/SessionProvider";
import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

const Account = () => {
	const { usersTemplates } = useSessionContext();

	return (
		<main className="h-screen flex flex-col items-center mt-24">
			<h1 className="text-3xl font-bold mb-4">Mes portfolios </h1>

			<div className="grid grid-cols-3 gap-4">
				{usersTemplates &&
					usersTemplates.map((template) => (
						<button key={template.id}>
							<Card key={template.id} isHoverable>
								<CardBody className="flex flex-col gap-3">
									<h2 className="text-sm">{template.templateTitle}</h2>
									<Button
										as={Link}
										href={`/portfolios/edit/${template.id}`}
										color="secondary"
										className="w-fit"
										size="sm"
										startContent={<Icon icon="mdi:pen" width={20} />}
									>
										Editer
									</Button>
								</CardBody>
							</Card>
						</button>
					))}
			</div>
		</main>
	);
};

export default Account;
