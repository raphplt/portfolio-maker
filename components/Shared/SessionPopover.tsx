"use client";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SessionPopover = () => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (!session) {
		console.log("no session");
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
					<Button color="primary" variant="ghost">
						{session.user.image ? (
							<Image
								src={session.user.image}
								alt="User Avatar"
								className="w-6 h-6 rounded-full"
								width={28}
								height={28}
							/>
						) : (
							<Icon icon="mdi:account-circle" width={28} />
						)}
						<span className="text-sm font-semibold">
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
							width={28}
							height={28}
						/>
					) : (
						<Icon icon="mdi:account-circle" width={28} />
					)}
					<div className="flex flex-col items-center">
						<span className="">
							{session.user?.firstName} {session.user?.lastName}
						</span>
						<p className="text-sm text-default-500">{session.user.email}</p>
					</div>
					<Button
						as={Link}
						href="/protected/account"
						color="default"
						variant="ghost"
						className="w-full"
						startContent={<Icon icon="mdi:account" width={18} />}
					>
						Mon compte
					</Button>
					<Button
						as={Link}
						href="/protected/portfolios"
						color="default"
						variant="ghost"
						className="w-full"
						startContent={<Icon icon="ic:baseline-web-stories" width={18} />}
					>
						Mes portfolios
					</Button>

					<Button
						onPress={() => signOut()}
						color="danger"
						size="sm"
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
