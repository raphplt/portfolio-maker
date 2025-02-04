import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SessionPopover = () => {
	const { data: session } = useSession();

	return (
		<div>
			{session && session.user ? (
				<Popover className="flex items-center space-x-2 " backdrop="blur">
					<PopoverTrigger>
						<div className="flex items-center space-x-2 cursor-pointer">
							{session.user.image && (
								<Image
									src={session.user.image}
									alt="User Avatar"
									className="w-6 h-6 rounded-full"
									width={28}
									height={28}
								/>
							)}
							<span className="text-sm font-medium">{session.user.name}</span>
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
						<span className="">{session.user.name}</span>
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
			) : (
				<Button
					as={Link}
					href="/api/auth/signin"
					size="sm"
					color="primary"
					startContent={<Icon icon="akar-icons:github-fill" width={18} />}
				>
					Connexion avec GitHub
				</Button>
			)}
		</div>
	);
};

export default SessionPopover;
