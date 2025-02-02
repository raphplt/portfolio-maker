import { ComponentProps, TemplateData } from "@/app/portfolios/new/[id]/helper";
import ReactDOMServer from "react-dom/server";

// Fonction asynchrone pour exporter le template en HTML autonome
const exportToHTML = async (
	Component: React.ComponentType<ComponentProps>,
	templateData: TemplateData
) => {
	// Rendu du composant en HTML
	const componentHTML = ReactDOMServer.renderToString(
		<Component {...templateData} />
	);

	// Charger le contenu de global.css depuis le serveur
	// Note : Assurez-vous que l'URL est correcte (ici "/global.css")
	const response = await fetch("/global.css");
	const cssText = await response.text();

	// Construire le HTML en incluant le CSS inline dans une balise <style>
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

	// Créer un Blob pour déclencher le téléchargement
	const blob = new Blob([html], { type: "text/html" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "portfolio.html";
	a.click();
	URL.revokeObjectURL(url);
};

export default exportToHTML;
