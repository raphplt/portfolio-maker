"use client";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SessionPopover = () => {
	const { data: session, status } = useSession();

	console.log("Session", session);

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (!session) {
		console.log("no session");
		return (
			<Button
				as={Link}
				href="/api/auth/signin"
				size="sm"
				color="primary"
				startContent={<Icon icon="mdi:email" width={18} />}
			>
				Connexion
			</Button>
		);
	}

	return (
		<div>
			<Popover className="flex items-center space-x-2 " backdrop="blur">
				<PopoverTrigger>
					<div className="flex items-center space-x-2 cursor-pointer">
						{/* {session.user?.image && (
							<Image
								src={session.user.image}
								alt="User Avatar"
								className="w-6 h-6 rounded-full"
								width={28}
								height={28}
							/>
						)} */}
						<span className="text-sm font-medium">
							{session.user.firstName && session.user.lastName
								? `${session.user.firstName} ${session.user.lastName}`
								: session.user.name}
						</span>
					</div>
				</PopoverTrigger>
				<PopoverContent className="flex flex-col p-4 space-y-2">
					{session.user.image && (
						<Image
							src={session.user.image}
							alt="User Avatar"
							className="w-6 h-6 rounded-full"
							width={28}
							height={28}
						/>
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
