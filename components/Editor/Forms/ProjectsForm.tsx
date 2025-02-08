import { useFormContext } from "@/contexts/FormContext";
import React, { useState } from "react";

const ProjectsForm = () => {
	const { handleChange, templateData } = useFormContext();
	const [showModalManualImport, setShowModalManualImport] = useState(false);
	const [showModalGithubImport, setShowModalGithubImport] = useState(false);
	// Fonction de récupération des projets GitHub
	// const fetchGithubProjects = useCallback(
	// 	async (accessToken: string) => {
	// 		try {
	// 			const res = await fetch("https://api.github.com/user/repos", {
	// 				headers: {
	// 					Authorization: `token ${accessToken}`,
	// 				},
	// 			});
	// 			if (!res.ok) {
	// 				throw new Error("Erreur lors de la récupération des repos");
	// 			}
	// 			const repos = await res.json();
	// 			const projects = repos
	// 				.filter(
	// 					(repo: Repository) =>
	// 						!repo.fork &&
	// 						!repo.archived &&
	// 						!repo.private &&
	// 						repo.owner.login === session?.user?.login
	// 				)
	// 				.sort(
	// 					(a: Repository, b: Repository) =>
	// 						new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
	// 				)
	// 				.slice(0, 6)
	// 				.map((repo: { name: string; description: string; html_url: string }) => ({
	// 					title: repo.name,
	// 					description: repo.description || "Aucune description",
	// 					link: repo.html_url,
	// 				}));
	// 			setHasFetchedProjects(true);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	},
	// 	[session?.user?.login]
	// );

	// useEffect(() => {
	// 	if (session && session.accessToken && !hasFetchedProjects) {
	// 		fetchGithubProjects(session.accessToken as string);
	// 	}
	// }, [session, hasFetchedProjects, fetchGithubProjects]);

	return (
		<div>
			<h1>ProjectsForm</h1>
			{templateData.projectList.length}
		</div>
	);
};

export default ProjectsForm;
