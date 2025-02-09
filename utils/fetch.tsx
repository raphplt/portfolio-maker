import { Repository } from "@/app/portfolios/new/[id]/helper";
import { Session } from "next-auth";

export const fetchGithubProjects = async (
	accessToken: string,
	setProjects: (
		projects: { title: string; description: string; link: string }[]
	) => void,
	setHasFetchedProjects: (hasFetched: boolean) => void,
	session: Session
) => {
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
					repo.owner.login === session?.user?.githubUsername
			)
			.sort(
				(a: Repository, b: Repository) =>
					new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
			)
			.map((repo: { name: string; description: string; html_url: string }) => ({
				title: repo.name,
				description: repo.description || "Aucune description",
				link: repo.html_url,
			}));
		console.log("projects", projects);
		setProjects(projects);
		setHasFetchedProjects(true);
	} catch (error) {
		console.error(error);
	}
};
