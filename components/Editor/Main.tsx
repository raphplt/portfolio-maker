import { Spinner } from "@heroui/react";
import React, { useEffect } from "react";
import ZoomWrapper from "../Shared/ZoomWrapper";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { useFormContext } from "@/context/FormContext";
import exportToHTML from "@/utils/export";
import { TemplateData } from "@/app/portfolios/new/[id]/helper";
import { useSessionContext } from "@/context/SessionProvider";

interface MainProps {
	Component: React.ComponentType<TemplateData> | null;
	id: string;
}

const Main: React.FC<MainProps> = ({ Component, id }) => {
	const { templateData, setTemplateData } = useFormContext();

	const { usersTemplates } = useSessionContext();

	const handleExport = () => {
		if (Component) {
			exportToHTML(Component, templateData);
		}
	};

	const template = usersTemplates.find(
		(template) => parseInt(String(template.id)) === parseInt(String(id))
	);

	useEffect(() => {
		if (template) {
			setTemplateData(template);
		}
	}, [setTemplateData, template]);

	return (
		<main>
			<TopBar />
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

			<SideBar exportTemplate={handleExport} />
		</main>
	);
};

export default Main;
