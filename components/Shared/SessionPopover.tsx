"use client";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Button,
	Link,
	Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CircleUser, GalleryHorizontalEnd } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";

const SessionPopover = () => {
	const { data: session, status } = useSession();

	const router = useRouter();

	if (status === "loading") {
		return <Button color="secondary">Chargement...</Button>;
	}

	const handleSignOut = async () => {
		await signOut();
		router.push("/");
	};

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
			<Popover
				className="flex items-center space-x-2 "
				backdrop="blur"
				aria-label="Mon compte"
			>
				<PopoverTrigger aria-label="Mon compte">
					<Button color="secondary" aria-label="Mon compte">
						<UserAvatar width={28} height={28} />

						<p className="font-semibold">
							{session.user?.firstName || "Utilisateur"}
						</p>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="flex flex-col p-4 space-y-2">
					<UserAvatar width={40} height={40} />

					<div className="flex flex-col items-center">
						<span className="">
							{session.user?.firstName} {session.user?.lastName}
						</span>
						<p className="text-sm text-default-500">{session.user.email}</p>
					</div>
					<Link
						href="/protected/account"
						className="w-full flex justify-start gap-2 text-black hover:bg-gray-200 rounded-xl p-2 transition-colors duration-200"
					>
						<CircleUser size={18} className="text-default-700" />
						Mon compte
					</Link>
					<Link
						href="/protected/portfolios"
						className="w-full flex justify-start gap-2 text-black hover:bg-gray-200 rounded-xl p-2 transition-colors duration-200"
					>
						<GalleryHorizontalEnd size={18} className="text-default-700" />
						Mes portfolios
					</Link>

					<Divider />

					<Button
						onPress={handleSignOut}
						color="danger"
						// variant="ghost"
						className="w-full mt-4"
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
