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
import Link from "next/link";
import React from "react";

const CardPortfolio = ({ template }: { template: TemplateData }) => {
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
								onPress={() => console.log("delete")}
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
