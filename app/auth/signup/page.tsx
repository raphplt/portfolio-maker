"use client";

import { Button, Divider, Form, Image, Input, Link } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
	const { status } = useSession();
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);

	if (status === "authenticated") {
		router.push("/");
	}

	if (status === "loading") {
		return <div>Chargement...</div>;
	}

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="grid grid-cols-2 gap-4 h-screen">
			<Button
				className="absolute top-4 left-4"
				size="sm"
				variant="bordered"
				startContent={
					<Icon icon="mdi:arrow-left" width={18} className="text-default-700" />
				}
				onPress={() => router.push("/")}
			>
				Retour
			</Button>
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-3xl font-bold text-center">Inscription à Penfolio</h1>

				<p className="text-center text-default-500 my-3 w-1/3">
					Créez un compte pour commencer à créer des portfolios.
				</p>

				<Form
					method="post"
					action="/api/auth/signup"
					className="w-1/2 2xl:w-1/3 mt-6 flex flex-col space-y-1"
				>
					<div className="flex flex-row space-x-2">
						<Input
							name="firstName"
							type="text"
							required
							size="lg"
							placeholder="Prénom"
						/>
						<Input name="lastName" type="text" required size="lg" placeholder="Nom" />
					</div>
					<Input
						name="email"
						type="email"
						required
						size="lg"
						placeholder="Email"
						startContent={
							<Icon icon="mdi:email" width={20} className="text-default-700" />
						}
					/>

					<Input
						name="password"
						type={showPassword ? "text" : "password"}
						startContent={
							<Icon icon="mdi:lock" width={20} className="text-default-700" />
						}
						required
						size="lg"
						placeholder="Mot de passe"
						endContent={
							<button
								type="button"
								className="text-default-700"
								onClick={togglePasswordVisibility}
							>
								<Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} width={20} />
							</button>
						}
					/>
					<Button type="submit" color="primary" className="w-full">
						S&apos;inscrire
					</Button>
				</Form>
				<Link href="/auth/signin" className="text-default-500 mt-4">
					Vous avez déjà un compte ? Connectez-vous
				</Link>

				<div className=" space-y-2 w-1/3">
					<Divider className="my-4" />
					<Button
						onPress={() => signIn("github")}
						startContent={<Icon icon="akar-icons:github-fill" width={20} />}
						className="bg-black text-white w-full flex items-center justify-center py-2 px-4 rounded-lg"
					>
						S&apos;inscrire avec GitHub
					</Button>
					<Button
						onPress={() => signIn("google")}
						startContent={<Icon icon="flat-color-icons:google" width={20} />}
						className="bg-white text-black border border-gray-300 w-full flex items-center justify-center py-2 px-4 rounded-lg"
					>
						S&apos;inscrire avec Google
					</Button>
				</div>
			</div>
			<Image
				src="/Signup.jpg"
				alt="Logo"
				width={2000}
				height={2000}
				radius="lg"
				className="object-cover rounded-lg max-h-screen p-2"
				style={{ borderRadius: "30px" }}
			/>
		</div>
	);
}
