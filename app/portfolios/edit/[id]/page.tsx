"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider } from "@/contexts/FormContext";
import { ZoomProvider } from "@/contexts/ZoomContext";
import Main from "@/components/Editor/Main";
import { useSessionContext } from "@/contexts/SessionProvider";
import { ComponentProps } from "../../new/[id]/helper";

const PortfolioEditor = () => {
	const { id } = useParams();
	const { usersTemplates } = useSessionContext();

	const template = usersTemplates.find(
		(template) => parseInt(String(template.id)) === parseInt(String(id))
	);

	const [Component, setComponent] =
		useState<React.ComponentType<ComponentProps> | null>(null);

	useEffect(() => {
		const loadComponent = async () => {
			try {
				const importedComponent = await import(
					`@components/TemplatesList/${template?.templateName}`
				);
				setComponent(() => importedComponent.default);
			} catch (error) {
				console.error("Error loading component:", error);
			}
		};

		if (template) {
			loadComponent();
		}
	}, [template, usersTemplates]);

	return (
		<ZoomProvider>
			<FormProvider>
				<style jsx global>{`
					::-webkit-scrollbar {
						display: none;
					}
					html,
					body {
						scrollbar-width: none;
						-ms-overflow-style: none;
					}
				`}</style>

				<Main Component={Component} id={String(id)} />
			</FormProvider>
		</ZoomProvider>
	);
};

export default PortfolioEditor;
