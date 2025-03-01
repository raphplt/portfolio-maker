import React from "react";
import ManualImport from "../Modals/ManualImport";
import ProjectList from "../ProjectList";
import GithubImport from "../Modals/GIthubImport";
import { Divider } from "@heroui/react";

const ProjectsForm = () => {
	return (
		<div>
			<ManualImport />
			<Divider className="my-2" />
			<GithubImport />
			<ProjectList />
		</div>
	);
};

export default ProjectsForm;
