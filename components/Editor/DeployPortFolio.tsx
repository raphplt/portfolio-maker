import {
	Button,
	Chip,
	Modal,
	ModalContent,
	useDisclosure,
} from "@heroui/react";
import React from "react";
import { Octokit } from "@octokit/rest";
import ReactDOMServer from "react-dom/server";
import { TemplateData } from "@/app/portfolios/new/[id]/helper";
import { useSessionContext } from "@/context/SessionProvider";
import { api_url } from "@/utils/fetch";
import { Earth } from "lucide-react";

interface DeployPortFolioProps {
	Component: React.ComponentType<TemplateData> | null;
	templateData: TemplateData | null;
}

const exportToHTMLString = async (
	Component: React.ComponentType<TemplateData>,
	templateData: TemplateData
) => {
	const componentHTML = ReactDOMServer.renderToString(
		<Component {...templateData} />
	);

	const response = await fetch("/global.css");
	const cssText = await response.text();

	const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exported Portfolio</title>
        <style>${cssText}</style>
    </head>
    <body>
        ${componentHTML}
    </body>
    </html>
  `;

	return html;
};

const DeployPortFolio: React.FC<DeployPortFolioProps> = ({
	Component,
	templateData,
}) => {
	const { user } = useSessionContext();
	const { onOpen, isOpen, onOpenChange } = useDisclosure();
	const [deployedUrl, setDeployedUrl] = React.useState<string>("");

	const deployPortfolio = async () => {
		console.log("user", user);
		if (!user?.githubAccessToken) {
			alert("Accès refusé. Veuillez vous connecter via GitHub.");
			return;
		}
		if (!Component || !templateData) {
			alert("Données du template indisponibles.");
			return;
		}

		try {
			const html = await exportToHTMLString(Component, templateData);
			const htmlBase64 = btoa(unescape(encodeURIComponent(html)));

			const octokit = new Octokit({ auth: user.githubAccessToken });
			const repoName = `portfolio-${Date.now()}`;

			// Création du dépôt avec initialisation auto (README.md)
			const { data: repo } = await octokit.repos.createForAuthenticatedUser({
				name: repoName,
				description: "Portfolio déployé automatiquement",
				private: false,
				auto_init: true, // <-- IMPORTANT
			});

			// Récupération du SHA de la branche principale (main)
			const { data: mainRef } = await octokit.git.getRef({
				owner: repo.owner.login,
				repo: repo.name,
				ref: "heads/main",
			});

			// Création de la branche gh-pages à partir de main
			await octokit.git.createRef({
				owner: repo.owner.login,
				repo: repo.name,
				ref: "refs/heads/gh-pages",
				sha: mainRef.object.sha,
			});

			// Ajout d'index.html dans la branche gh-pages
			await octokit.repos.createOrUpdateFileContents({
				owner: repo.owner.login,
				repo: repo.name,
				path: "index.html",
				message: "Ajout du portfolio sur gh-pages",
				content: htmlBase64,
				branch: "gh-pages",
			});

			// URL de GitHub Pages (peut prendre quelques minutes à s'activer)
			const pagesUrl = `https://${repo.owner.login}.github.io/${repo.name}`;
			setDeployedUrl(pagesUrl);
			onOpen();

			const templateDataSave = { ...templateData, deployedUrl: pagesUrl };
			await fetch(api_url + "/users-templates/" + templateData.id, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(templateDataSave),
			});
		} catch (error) {
			if (error instanceof Error) {
				console.error("Erreur lors du déploiement:", error);
				alert(
					`Erreur lors du déploiement du portfolio : ${
						error.message || "Erreur inconnue"
					}`
				);
			}
		}
	};

	return (
		<>
			{!deployedUrl ? (
				<Button
					color="primary"
					onPress={deployPortfolio}
					startContent={<Earth size={18} />}
				>
					Déployer Portfolio
				</Button>
			) : (
				<Chip color="success" startContent={<Earth size={18} />}>
					{deployedUrl}
				</Chip>
			)}

			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<div className="p-6">
						<h3 className="text-lg font-semibold mb-4">Déploiement réussi !</h3>
						<p className="mb-4">Votre portfolio est disponible à l&apos;adresse :</p>
						<a
							href={deployedUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:underline break-all"
						>
							{deployedUrl}
						</a>
					</div>
				</ModalContent>
			</Modal>
		</>
	);
};

export default DeployPortFolio;
