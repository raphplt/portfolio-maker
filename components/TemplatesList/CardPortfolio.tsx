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
import { addToast } from "@heroui/toast";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const port = process.env.NEXT_PUBLIC_API_URL || 3000;

const CardPortfolio = ({ template }: { template: TemplateData }) => {


	const handleDelete = () => {
		console.log("delete");
		try {

			axios.delete(`${port}/users-templates/${template.id}`);
			toast.success("Portfolio supprimé avec succès");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}

		}
		
	};

	return (
		<button key={template.id}>
			<Card key={template.id} isHoverable>
				<CardHeader className="flex flex-row justify-between items-center">
					<h2 className="text-sm">{template.templateTitle}</h2>
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
						href={`/portfolios/edit/${template.id}`}
						color="secondary"
						className="w-fit"
						size="sm"
						endContent={<Icon icon="mdi:arrow-right" width={20} />}
					>
						Editer
					</Button>
				</CardBody>
			</Card>
		</button>
	);
};

export default CardPortfolio;
