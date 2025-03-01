"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Account = () => {
	const { data: session } = useSession();
	return (
		<main>
			<h1>Account</h1>
			<p>Protected page</p>
			{session && (
				<>
					<p>Session active</p>

					<p>Utilisateur: {session.user.email}</p>
				</>
			)}
		</main>
	);
};

export default Account;
