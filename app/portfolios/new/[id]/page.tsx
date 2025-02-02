"use client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
	ComponentProps,
	MenusType,
	Repository,
	TemplateData,
	templateDefaultData,
} from "./helper";
import TopBar from "@/components/Editor/TopBar";
import SideBar from "@/components/Editor/SideBar";
import { Button } from "@heroui/react";
import exportToHTML from "@/utils/export";

const PortfolioEditor = () => {
	const { data: session } = useSession();
	const { id } = useParams();
	const [Component, setComponent] =
		useState<React.ComponentType<ComponentProps> | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [templateData, setTemplateData] =
		useState<TemplateData>(templateDefaultData);
	const [hasFetchedProjects, setHasFetchedProjects] = useState(false);
	const editorRef = useRef<HTMLDivElement>(null);
	const [zoom, setZoom] = useState(1);
	const [fullScreen, setFullScreen] = useState(false);
	const [menuSelected, setMenuSelected] = useState<MenusType>("infos");

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
			const projects = repos
				.filter(
					(repo: Repository) =>
						!repo.fork &&
						!repo.archived &&
						!repo.private &&
						repo.owner.login === session?.user?.login
				)
				.sort(
					(a: Repository, b: Repository) =>
						new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
				)
				.slice(0, 6)
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

	const handleChange = (
		field: keyof TemplateData | keyof TemplateData["theme"],
		value: string
	) => {
		setTemplateData((prev) => {
			if (field in prev.theme) {
				return {
					...prev,
					theme: {
						...prev.theme,
						[field as keyof TemplateData["theme"]]: value,
					},
				};
			}
			return {
				...prev,
				[field as keyof TemplateData]: value,
			};
		});
	};
	const handleSave = () => {
		console.log("Données sauvegardées :", templateData);
		setIsEditing(false);
	};

	const decreaseZoom = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
	const increaseZoom = () => setZoom((prev) => Math.min(prev + 0.1, 2));

	const exitFulLScreen = () => {
		setZoom(1);
		setFullScreen((prev) => !prev);
	};

	const handleExport = () => {
		if (Component) {
			exportToHTML(Component, templateData);
		}
	};

	return (
		<>
			<TopBar menuSelected={menuSelected} setMenuSelected={setMenuSelected} />
			<div className="pt-20 flex flex-col md:flex-row bg-slate-900 min-h-screen overflow-hidden">
				<div className="flex-1 p-6 md:mr-64">
					<div
						ref={editorRef}
						style={{
							transform: `scale(${zoom})`,
							transformOrigin: "top center",
							...(fullScreen && {
								position: "fixed",
								top: 0,
								left: 0,
								width: "100vw",
								height: "100vh",
								zIndex: 9999,
								background: "#000",
								overflow: "auto",
							}),
						}}
					>
						{Component ? (
							<>
								<Button
									color="primary"
									size="sm"
									className="mb-4 absolute bottom-4 right-4 z-20"
									style={{
										display: fullScreen ? "block" : "none",
									}}
									onPress={exitFulLScreen}
								>
									{fullScreen ? "Quitter le plein écran" : "Plein écran"}
								</Button>
								<Component {...templateData} />
							</>
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
				setFullScreen={() => setFullScreen((prev) => !prev)}
				increaseZoom={increaseZoom}
				decreaseZoom={decreaseZoom}
				zoom={zoom}
				setZoom={setZoom}
				menuSelected={menuSelected}
				exportTemplate={handleExport}
			/>
		</>
	);
};

export default PortfolioEditor;