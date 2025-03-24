import { TemplateData } from "@/app/portfolios/new/[id]/helper";
import {
	Card,
	CardHeader,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Button,
	CardBody,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { Pen } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { useSessionContext } from "@/context/SessionProvider";

const port = process.env.NEXT_PUBLIC_API_URL || 3000;

const CardPortfolio = ({ template }: { template: TemplateData }) => {
	const { refreshTemplates } = useSessionContext();

	const handleDelete = async () => {
		try {
			await axios.delete(`${port}/users-templates/${template.id}`);
			toast.success("Portfolio supprimé avec succès");
			// Refresh the templates list from the API
			await refreshTemplates();
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	};

	return (
		<Card key={template.id} isHoverable className="min-w-64">
			<CardHeader className="flex flex-row justify-between items-center">
				<h2 className="font-semibold text-default-800 text-base">
					{template.templateTitle}
				</h2>
				<Popover>
					<PopoverTrigger>
						<Icon icon="mdi:dots-vertical" width={20} />
					</PopoverTrigger>
					<PopoverContent className="flex flex-col gap-2">
						<Button
							color="danger"
							size="sm"
							onPress={handleDelete}
							className="w-full"
							startContent={<Icon icon="mdi:trash-can" width={20} />}
						>
							Supprimer
						</Button>
					</PopoverContent>
				</Popover>
			</CardHeader>
			<CardBody className="flex flex-col gap-3">
				<Button
					as={Link}
					href={`portfolios/edit/${template.id}`}
					color="primary"
					radius="sm"
					className="w-fit"
					endContent={<Pen width={18} />}
				>
					Editer
				</Button>
			</CardBody>
		</Card>
	);
};

export default CardPortfolio;