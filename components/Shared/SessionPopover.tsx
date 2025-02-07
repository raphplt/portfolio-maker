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

	console.log("session", session);

	if (!session) {
		console.log("no session");
		return (
			<Button as={Link} href="/api/auth/signin" color="primary">
				Connexion
			</Button>
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
								width={28}
								height={28}
							/>
						) : (
							<Icon icon="mdi:account-circle" width={28} />
						)}
						<span className="text-sm font-medium">
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
					<span className="">{session.user?.name}</span>
					<p>
						<strong>{session.user.email}</strong>
					</p>
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
