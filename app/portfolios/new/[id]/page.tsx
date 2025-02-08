"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ComponentProps } from "./helper";
import { FormProvider } from "@/contexts/FormContext";
import { ZoomProvider } from "@/contexts/ZoomContext";
import Main from "@/components/Editor/Main";

const PortfolioEditor = () => {
	const { id } = useParams();

	const [Component, setComponent] =
		useState<React.ComponentType<ComponentProps> | null>(null);

	useEffect(() => {
		const loadComponent = async () => {
			try {
				const importedComponent = await import(`@components/TemplatesList/${id}`);
				setComponent(() => importedComponent.default);
			} catch (error) {
				console.error("Error loading component:", error);
			}
		};

		if (id) {
			loadComponent();
		}
	}, [id]);

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

				<Main Component={Component} />
			</FormProvider>
		</ZoomProvider>
	);
};

export default PortfolioEditor;
