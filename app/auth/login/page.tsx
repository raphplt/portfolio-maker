"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (result?.ok) {
			router.push("/");
		} else {
			alert("Login failed");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 className="text-3xl font-bold mb-6">Login</h1>
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded shadow-md w-full max-w-sm"
			>
				<div className="mb-4">
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
				<Button type="submit">Login</Button>
			</form>
			<button
				onClick={() => signIn("github")}
				className="mt-4 text-indigo-600 hover:underline"
			>
				Login with GitHub
			</button>
		</div>
	);
};

export default LoginPage;
