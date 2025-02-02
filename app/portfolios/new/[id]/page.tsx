"use client";
import { useSession } from "next-auth/react";
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
	const { data: session } = useSession();
	const { id } = useParams();
	const [Component, setComponent] =
		useState<React.ComponentType<ComponentProps> | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [templateData, setTemplateData] =
		useState<TemplateData>(templateDefaultData);
	const [zoom, setZoom] = useState(1);
	const [hasFetchedProjects, setHasFetchedProjects] = useState(false);
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

	// Gestion du zoom via ctrl+molette sur l'éditeur
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

	console.log("session", session);
	// Récupérer les projets GitHub (une seule fois)
	const fetchGithubProjects = async (accessToken: string) => {
		try {
			const res = await fetch("https://api.github.com/user/repos", {
				headers: {
					Authorization: `token ${accessToken}`,
				},
			});
			if (!res.ok) {
				throw new Error("Erreur lors de la récupération des repos");
			}
			const repos = await res.json();
			console.log("repos", repos);
			const projects = repos
				.filter(
					(repo) =>
						!repo.fork &&
						!repo.archived &&
						!repo.private &&
						repo.owner.login === session?.user?.login
				)
				// .slice(0, 3)

				.map((repo: { name: string; description: string; html_url: string }) => ({
					title: repo.name,
					description: repo.description || "Aucune description",
					link: repo.html_url,
				}));
			setTemplateData((prev) => ({
				...prev,
				projects,
			}));
			setHasFetchedProjects(true);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (session && session.accessToken && !hasFetchedProjects) {
			fetchGithubProjects(session.accessToken as string);
		}
	}, [session, hasFetchedProjects]);

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
			<div className="pt-20 flex flex-col md:flex-row bg-gray-900 min-h-screen overflow-hidden">
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
			{/* Si l'utilisateur n'est pas connecté, on affiche un bouton pour se connecter */}

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
