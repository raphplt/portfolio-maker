import { TemplateData } from "@/app/portfolios/new/[id]/page";
import { Button, Input, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

type SideBarProps = {
	isEditing: boolean;
	handleEditToggle: () => void;
	templateData: {
		name: string;
		description: string;
		biography: string;
	};
	handleChange: (field: keyof TemplateData, value: string) => void;
	handleSave: () => void;
};

const SideBar = ({
	isEditing,
	handleEditToggle,
	templateData,
	handleChange,
	handleSave,
}: SideBarProps) => {
	return (
		<aside className="w-full md:w-64 bg-gray-100 p-4 border-l fixed right-0 top-20 h-full overflow-auto rounded-lg">
			<h2 className="text-lg font-semibold mb-2">Édition du Portfolio</h2>
			<Button
				onPress={handleEditToggle}
				color="primary"
				size="sm"
				startContent={
					<Icon
						icon={isEditing ? "mdi:close" : "mdi:pencil"}
						width={18}
						color="white"
					/>
				}
			>
				{isEditing ? "Annuler l'édition" : "Modifier le portfolio"}
			</Button>
			{isEditing && (
				<div className="space-y-4 mt-4">
					<div>
						<Input
							id="name"
							placeholder="Nom"
							label="Nom"
							type="text"
							variant="bordered"
							value={templateData.name}
							onChange={(e) => handleChange("name", e.target.value)}
							isClearable
							onClear={() => handleChange("name", "")}
						/>
					</div>
					<div>
						<Input
							id="description"
							label="Description"
							placeholder="Description"
							variant="bordered"
							isClearable
							onClear={() => handleChange("description", "")}
							type="text"
							value={templateData.description}
							onChange={(e) => handleChange("description", e.target.value)}
						/>
					</div>
					<div>
						<Textarea
							id="biography"
							label="Biographie"
							placeholder="Biographie"
							variant="bordered"
							value={templateData.biography}
							onChange={(e) => handleChange("biography", e.target.value)}
							rows={4}
						/>
					</div>
					<Button
						onPress={handleSave}
						color="secondary"
						size="sm"
						endContent={<Icon icon="mdi:content-save" width={20} color="white" />}
					>
						Enregistrer
					</Button>
				</div>
			)}
		</aside>
	);
};

export default SideBar;
