"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const fadeIn = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
	const [isAnimating, setIsAnimating] = useState(false);
	const router = useRouter();

	// Au clic, on lance l'animation et on redirige après 600ms
	const handleClick = () => {
		setIsAnimating(true);
		setTimeout(() => {
			router.push("/portfolios/new");
		}, 600);
	};

	return (
		<>
			<main className="bg-background text-foreground">
				{/* Hero Section */}
				<section
					className="min-h-screen flex flex-col items-center justify-center text-center px-8 relative bg-cover bg-center bg-no-repeat"
					style={{ backgroundImage: "url('/Background.png')" }}
				>
					<motion.h1
						initial="hidden"
						animate="visible"
						variants={fadeIn}
						className="text-7xl font-extrabold text-navy"
					>
						Portfolio Maker
					</motion.h1>
					<motion.h2
						initial="hidden"
						animate="visible"
						variants={fadeIn}
						className="text-3xl text-default-700 mt-4 max-w-2xl"
					>
						Créez un portfolio professionnel en quelques minutes, sans effort.
					</motion.h2>
					<motion.div initial="hidden" animate="visible" variants={fadeIn}>
						{/* On affiche le bouton tant que l'animation n'est pas lancée */}
						{!isAnimating && (
							<Button
								color="primary"
								size="lg"
								endContent={<Icon icon="akar-icons:arrow-right" />}
								as="button"
								onPress={handleClick}
								className="mt-6 text-white"
							>
								Commencer
							</Button>
						)}
					</motion.div>
				</section>

				{/* Autres sections... */}
				<section className="min-h-screen grid md:grid-cols-3 gap-12 px-8 py-20 max-w-6xl mx-auto text-center">
					{[
						{
							title: "Automatisation",
							description:
								"Importez vos projets directement depuis Github, LinkedIn et Behance.",
							color: "bg-teal",
							icon: "ooui:robot",
						},
						{
							title: "Design Moderne",
							description:
								"Des templates élégants et professionnels adaptés aux créatifs et développeurs.",
							color: "bg-violet",
							icon: "fluent:design-ideas-16-filled",
						},
						{
							title: "Déploiement Simplifié",
							description: "Hébergement intégré avec nom de domaine personnalisé.",
							color: "bg-gold",
							icon: "material-symbols:deployed-code-outline",
						},
					].map((item, index) => (
						<motion.div
							key={index}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={fadeIn}
							className={`${item.color} p-8 rounded-2xl shadow-xl text-white h-fit flex flex-col items-center gap-4`}
						>
							<Icon icon={item.icon} width={48} />
							<h3 className="text-3xl font-bold">{item.title}</h3>
							<p className="mt-4 text-lg">{item.description}</p>
						</motion.div>
					))}
				</section>

				{/* Qui sommes-nous */}
				<section className="min-h-screen flex flex-col items-center justify-center text-center px-8">
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
