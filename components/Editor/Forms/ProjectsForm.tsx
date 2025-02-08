import React from "react";
import ManualImport from "../Modals/ManualImport";
import ProjectList from "../ProjectList";

const ProjectsForm = () => {
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
			<ManualImport />
			<ProjectList />
		</div>
	);
};

export default ProjectsForm;
