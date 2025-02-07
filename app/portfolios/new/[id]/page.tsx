"use client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import {
	ComponentProps,
	MenusType,
	Repository,
	TemplateData,
	templateDefaultData,
} from "./helper";
import TopBar from "@/components/Editor/TopBar";
import SideBar from "@/components/Editor/SideBar";
import { Spinner } from "@heroui/react";
import exportToHTML from "@/utils/export";
import ZoomWrapper from "@/components/Shared/ZoomWrapper";
import { ZoomProvider } from "@/Contexts/ZoomContext";

const PortfolioEditor = () => {
	const { id } = useParams();
	const { data: session } = useSession();

	const [Component, setComponent] =
		useState<React.ComponentType<ComponentProps> | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [templateData, setTemplateData] =
		useState<TemplateData>(templateDefaultData);
	const [hasFetchedProjects, setHasFetchedProjects] = useState(false);

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

	const fetchGithubProjects = useCallback(
		async (accessToken: string) => {
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
		},
		[session?.user?.login]
	);

	useEffect(() => {
		if (session && session.accessToken && !hasFetchedProjects) {
			fetchGithubProjects(session.accessToken as string);
		}
	}, [session, hasFetchedProjects, fetchGithubProjects]);

	const handleEditToggle = () => {
		setIsEditing(!isEditing);
	};

	const handleChange = (field: string, value: string | boolean) => {
		setTemplateData((prev) => {
			const keys = field.split(".");
			const newData = { ...prev };

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let current: any = newData;

			keys.forEach((key, index) => {
				if (index === keys.length - 1) {
					current[key] = value;
				} else {
					current[key] = { ...current[key] };
					current = current[key];
				}
			});

			return newData;
		});
	};

	const handleSave = () => {
		console.log("Données sauvegardées :", templateData);
		setIsEditing(false);
	};

	const handleExport = () => {
		if (Component) {
			exportToHTML(Component, templateData);
		}
	};

	return (
		<ZoomProvider>
			<style jsx global>{`
				/* Pour Chrome, Safari et Opera */
				::-webkit-scrollbar {
					display: none;
				}
				/* Pour Firefox */
				html,
				body {
					scrollbar-width: none;
					-ms-overflow-style: none;
				}
			`}</style>

			<TopBar menuSelected={menuSelected} setMenuSelected={setMenuSelected} />
			<div className="pt-20 flex flex-col md:flex-row bg-[#333333] min-h-screen overflow-hidden">
				<div className="flex-1 p-6 md:mr-64">
					<ZoomWrapper>
						{Component ? (
							<Component {...templateData} />
						) : (
							<div className="flex items-center justify-center h-full">
								<h1 className="text-white text-2xl font-bold">
									Chargement du template...
								</h1>
								<Spinner size="lg" className="ml-4" />
							</div>
						)}
					</ZoomWrapper>
				</div>
			</div>

			<SideBar
				isEditing={isEditing}
				handleEditToggle={handleEditToggle}
				templateData={templateData}
				handleChange={handleChange}
				handleSave={handleSave}
				menuSelected={menuSelected}
				exportTemplate={handleExport}
			/>
		</ZoomProvider>
	);
};

export default PortfolioEditor;