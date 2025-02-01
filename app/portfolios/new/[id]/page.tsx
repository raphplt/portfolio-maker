"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Custom = () => {
	const { id } = useParams();
	const [Component, setComponent] = useState<React.ComponentType | null>(null);

	useEffect(() => {
		const loadComponent = async () => {
			try {
				const importedComponent = await import(
					`../../../../components/TemplatesList/${id}`
				);
				setComponent(() => importedComponent.default);
			} catch (error) {
				console.error("Error loading component:", error);
			}
		};

		if (id) {
			loadComponent();
		}
	}, [id]);

	return <div>{Component ? <Component /> : <p>Loading...</p>}</div>;
};

export default Custom;
