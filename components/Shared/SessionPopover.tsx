"use client";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Button,
	Link,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CircleUser, GalleryHorizontalEnd } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const SessionPopover = () => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <Button color="primary">Chargement...</Button>;
	}

	if (!session) {
		return (
			<>
				<Button as={Link} href="/auth/signup" color="primary" variant="ghost">
					Inscription
				</Button>
				<Button as={Link} href="/api/auth/signin" color="primary">
					Connexion
				</Button>
			</>
		);
	}

	return (
		<div>
			<Popover className="flex items-center space-x-2 " backdrop="blur">
				<PopoverTrigger>
					<Button color="secondary">
						{session.user.image ? (
							<Image
								src={session.user.image}
								alt="User Avatar"
								className="w-6 h-6 rounded-full"
								width={24}
								height={24}
							/>
						) : (
							<Icon icon="mdi:account-circle" width={24} />
						)}
						<span className="font-semibold">
							{session.user?.firstName || "Utilisateur"}
						</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="flex flex-col p-4 space-y-2">
					{session.user.image ? (
						<Image
							src={session.user.image}
							alt="User Avatar"
							className="w-6 h-6 rounded-full"
							width={40}
							height={40}
						/>
					) : (
						<Icon icon="mdi:account-circle" width={40} />
					)}
					<div className="flex flex-col items-center">
						<span className="">
							{session.user?.firstName} {session.user?.lastName}
						</span>
						<p className="text-sm text-default-500">{session.user.email}</p>
					</div>
					<Link
						href="/protected/account"
						className="w-full flex justify-start gap-2 py-1 text-black"
					>
						<CircleUser size={20} />
						Mon compte
					</Link>
					<Link
						href="/protected/portfolios"
						className="w-full flex justify-start gap-2 py-1  text-black"
					>
						<GalleryHorizontalEnd size={20} />
						Mes portfolios
					</Link>

					<Button
						onPress={() => signOut()}
						color="danger"
						variant="ghost"
						className="w-full mt-2"
						endContent={<Icon icon="mdi:logout" width={18} />}
					>
						Déconnexion
					</Button>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default SessionPopover;
