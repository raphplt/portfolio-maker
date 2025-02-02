"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { templateDefaultData } from "./helper";
import TopBar from "@/components/Editor/TopBar";
import SideBar from "@/components/Editor/SideBar";

export interface TemplateData {
	name: string;
	description: string;
	biography: string;
	projects: { title: string; description: string; link: string }[];
	contact: { email: string; phone: string; linkedin: string };
}

export interface ComponentProps {
	name: string;
	description: string;
	biography: string;
	projects: { title: string; description: string; link: string }[];
	contact: { email: string; phone: string; linkedin: string };
}

const PortfolioEditor = () => {
	const { id } = useParams();
	const [Component, setComponent] =
		useState<React.ComponentType<ComponentProps> | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [templateData, setTemplateData] =
		useState<TemplateData>(templateDefaultData);

	const [zoom, setZoom] = useState(1);
	const editorRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		const handleWheelGlobal = (e: WheelEvent) => {
			if (
				e.ctrlKey &&
				editorRef.current &&
				editorRef.current.contains(e.target as Node)
			) {
				e.preventDefault();
				const delta = e.deltaY > 0 ? -0.1 : 0.1;
				setZoom((prev) => {
					const newZoom = prev + delta;
					return Math.min(Math.max(newZoom, 0.5), 2);
				});
			}
		};

		window.addEventListener("wheel", handleWheelGlobal, { passive: false });
		return () => {
			window.removeEventListener("wheel", handleWheelGlobal);
		};
	}, []);

	const handleEditToggle = () => {
		setIsEditing(!isEditing);
	};

	const handleChange = (field: keyof TemplateData, value: string) => {
		setTemplateData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSave = () => {
		console.log("Données sauvegardées :", templateData);
		setIsEditing(false);
	};

	const decreaseZoom = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
	const increaseZoom = () => setZoom((prev) => Math.min(prev + 0.1, 2));

	return (
		<>
			<TopBar
				zoom={zoom}
				increaseZoom={increaseZoom}
				decreaseZoom={decreaseZoom}
			/>
			<div className="pt-20 flex flex-col md:flex-row bg-gray-700 min-h-screen overflow-hidden">
				<div className="flex-1 p-6 md:mr-64">
					<div
						ref={editorRef}
						style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
					>
						{Component ? (
							<Component {...templateData} />
						) : (
							<p className="text-white">Loading portfolio...</p>
						)}
					</div>
				</div>
			</div>
			<SideBar
				isEditing={isEditing}
				handleEditToggle={handleEditToggle}
				templateData={templateData}
				handleChange={handleChange}
				handleSave={handleSave}
			/>
		</>
	);
};

export default PortfolioEditor;
