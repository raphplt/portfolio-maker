"use client";
import { Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { templateDefaultData } from "./helper";

interface TemplateData {
	name: string;
	description: string;
	biography: string;
	projects: { title: string; description: string; link: string }[];
	contact: { email: string; phone: string; linkedin: string };
}

interface ComponentProps {
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
	const router = useRouter();
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
			<header className="fixed top-0 left-0 right-0 bg-gray-50 shadow z-50 w-11/12 mx-auto rounded-lg">
				<div className="container mx-auto px-2 py-3 flex justify-between items-center">
					<div className="flex items-center space-x-6">
						<Link className="font-bold text-lg text-black" href="/">
							Portfolio Maker
						</Link>
						<Button onPress={router.back} className="text-default-700 font-semibold">
							Retour
						</Button>
					</div>
					<div className="flex items-center space-x-4">
						<h1 className="text-lg font-semibold">Actions Globales</h1>
						<Button color="primary" size="sm">
							Action 1
						</Button>
						<Button color="secondary" size="sm">
							Action 2
						</Button>
						<div className="flex items-center space-x-2">
							<Button onPress={decreaseZoom} size="sm" color="warning">
								-
							</Button>
							<span className="font-semibold">{Math.round(zoom * 100)}%</span>
							<Button onPress={increaseZoom} size="sm" color="warning">
								+
							</Button>
						</div>
					</div>
				</div>
			</header>

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

				<aside className="w-full md:w-64 bg-gray-100 p-4 border-l fixed right-0 top-20 h-full overflow-auto rounded-lg">
					<h2 className="text-lg font-semibold mb-4">Édition du Portfolio</h2>
					<Button onPress={handleEditToggle} color="warning">
						{isEditing ? "Annuler l'édition" : "Modifier le portfolio"}
					</Button>
					{isEditing && (
						<div className="space-y-4 mt-4">
							<div>
								<label className="block font-semibold" htmlFor="name">
									Nom
								</label>
								<input
									id="name"
									type="text"
									value={templateData.name}
									onChange={(e) => handleChange("name", e.target.value)}
									className="w-full p-2 border rounded"
								/>
							</div>
							<div>
								<label className="block font-semibold" htmlFor="description">
									Description
								</label>
								<input
									id="description"
									type="text"
									value={templateData.description}
									onChange={(e) => handleChange("description", e.target.value)}
									className="w-full p-2 border rounded"
								/>
							</div>
							<div>
								<label className="block font-semibold" htmlFor="biography">
									Biographie
								</label>
								<textarea
									id="biography"
									value={templateData.biography}
									onChange={(e) => handleChange("biography", e.target.value)}
									className="w-full p-2 border rounded"
									rows={4}
								/>
							</div>
							<Button
								onPress={handleSave}
								color="secondary"
								endContent={<Icon icon="mdi:content-save" width={20} color="white" />}
							>
								Enregistrer
							</Button>
						</div>
					)}
				</aside>
			</div>
		</>
	);
};

export default PortfolioEditor;
