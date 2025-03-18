"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/Home/HeroSection";
import ChooseSection from "@/components/Home/ChooseSection";

const fadeIn = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
	const [isAnimating, setIsAnimating] = useState(false);
	const router = useRouter();

	return (
		<>
			<main className="bg-white text-black">
				{/* Hero Section */}
				<HeroSection />

				{/* Pourquoi nous choisir */}
				<ChooseSection />

				{/* Qui sommes-nous */}
				<section className="min-h-screen flex flex-col items-center justify-center text-center px-8 text-black">
					<motion.h2
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="text-5xl font-bold text-navy"
					>
						Qui sommes-nous ?
					</motion.h2>
					<motion.p
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="mt-4 text-xl text-default-700 max-w-3xl"
					>
						Nous sommes une équipe passionnée de développeurs et designers,
						spécialisés dans les outils SaaS et les solutions pour les créatifs.
					</motion.p>
				</section>

				{/* Contact */}
				<section className="min-h-screen flex flex-col items-center justify-center bg-sand text-center px-8">
					<motion.h2
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="text-5xl font-bold text-navy"
					>
						Nous contacter
					</motion.h2>
					<motion.p
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="mt-4 text-xl text-default-700"
					>
						Une question ? Un partenariat ? Écrivez-nous !
					</motion.p>
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
					>
						<Button
							color="secondary"
							size="lg"
							className="mt-6 text-white"
							as={Link}
							href="mailto:contact@portfolio-maker.com"
						>
							Contactez-nous
						</Button>
					</motion.div>
				</section>
			</main>

			{/* Overlay animé au clic */}
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
		</>
	);
};

export default Home;
