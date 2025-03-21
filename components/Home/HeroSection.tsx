import { Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const fadeIn = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const HeroSection = () => {
	const [isAnimating, setIsAnimating] = useState(false);
	const router = useRouter();

	const handleClick = () => {
		setIsAnimating(true);
		setTimeout(() => {
			router.push("/portfolios/new");
		}, 600);
	};

	return (
		<section
			className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-8 relative bg-cover bg-center bg-no-repeat overflow-hidden"
			style={{ backgroundImage: "url('/Background.png')" }}
		>
			{/* Overlay gradient for better text readability */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 z-0"></div>

			{/* Content container */}
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate="visible"
				className="max-w-5xl mx-auto relative z-10 flex flex-col items-center"
			>
				{/* Logo or brand badge */}
				<motion.div variants={fadeIn} className="mb-4">
					<span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
						Portfolio Maker
					</span>
				</motion.div>

				<motion.h1 variants={fadeIn} className="text-7xl font-extrabold text-navy">
					Penfolio
				</motion.h1>

				<motion.h2
					variants={fadeIn}
					className="text-3xl text-default-700 mt-4 max-w-2xl"
				>
					Créez un portfolio professionnel en quelques minutes, sans effort.
				</motion.h2>

				{/* Feature highlights */}
				<motion.div
					variants={fadeIn}
					className="flex flex-wrap justify-center gap-4 mt-6"
				>
					{["Projets Github", "Expériences LinkedIn", "Designs Behance"].map(
						(item, index) => (
							<div key={index} className="flex items-center">
								<Icon icon="mdi:check-circle" className="text-teal mr-2" />
								<span>{item}</span>
							</div>
						)
					)}
				</motion.div>

				{/* Social proof */}
				<motion.div variants={fadeIn} className="mt-8 mb-6">
					<div className="flex items-center justify-center gap-6">
						<div className="text-center">
							<p className="text-2xl font-bold">200+</p>
							<p className="text-sm text-default-500">Portfolios créés</p>
						</div>
						<div className="h-10 w-px bg-default-300"></div>
						<div className="text-center">
							<p className="text-2xl font-bold">4.8/5</p>
							<p className="text-sm text-default-500">Note moyenne</p>
						</div>
						<div className="h-10 w-px bg-default-300"></div>
						<div className="text-center">
							<p className="text-2xl font-bold">3</p>
							<p className="text-sm text-default-500">Templates</p>
						</div>
					</div>
				</motion.div>

				{/* CTA buttons */}
				<motion.div variants={fadeIn} className="flex gap-4">
					{/* Primary CTA button */}
					<Button
						color="primary"
						size="lg"
						endContent={<Icon icon="akar-icons:arrow-right" />}
						as="button"
						onPress={handleClick}
						className="mt-6 text-white font-medium"
					>
						Commencer gratuitement
					</Button>

					{/* Secondary CTA */}
					<Button
						color="primary"
						variant="ghost"
						size="lg"
						as={Link}
						href="/examples"
						className="mt-6 font-medium"
					>
						Voir des exemples
					</Button>
				</motion.div>

				{/* Preview image */}
				<motion.div
					variants={fadeIn}
					className="mt-12 relative w-full max-w-3xl shadow-2xl rounded-lg overflow-hidden border border-default-200"
				>
					<Image
						src="/templates/Retro_Frame.png" // A modifier
						alt="Aperçu d'un portfolio"
						width={1200}
						height={600}
						className="w-full h-auto"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-background to-transparent rounded-lg"></div>
				</motion.div>
			</motion.div>

			{/* Scroll indicator */}
			<motion.div
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 10 }}
				transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
			>
				<Icon icon="mdi:chevron-down" className="text-3xl text-default-600" />
			</motion.div>

			<AnimatePresence>
				{isAnimating && (
					<motion.div
						initial={{ scale: 1 }}
						animate={{ scale: 50 }}
						exit={{ scale: 50 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="fixed top-1/2 left-1/2 z-50 bg-primary rounded-full"
						style={{
							width: 60,
							height: 60,
							transform: "translate(-50%, -50%)",
							transformOrigin: "center",
						}}
					/>
				)}
			</AnimatePresence>
		</section>
	);
};

export default HeroSection;
