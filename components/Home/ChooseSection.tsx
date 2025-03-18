import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import React from "react";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const cardVariants = {
	hidden: {
		opacity: 0,
		y: 50,
		scale: 0.9,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.5,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

const ChooseSection = () => {
	const sections = [
		{
			title: "Automatisation Intelligente",
			description:
				"Importez vos projets en un clic depuis Github, LinkedIn et Behance. Notre IA analyse et organise automatiquement vos réalisations.",
			color: "bg-gradient-to-br from-asparagus to-asparagus/80",
			icon: "ooui:robot",
			features: [
				"Import automatique",
				"Organisation intelligente",
				"Mise à jour en temps réel",
			],
		},
		{
			title: "Design Premium",
			description:
				"Des templates modernes et responsive conçus par des experts UI/UX. Personnalisez chaque aspect pour refléter votre identité.",
			color: "bg-gradient-to-br from-english-violet to-english-violet/80",
			icon: "fluent:design-ideas-16-filled",
			features: [
				"Templates premium",
				"Personnalisation complète",
				"Responsive design",
			],
		},
		{
			title: "Déploiement Pro",
			description:
				"Hébergement haute performance inclus avec SSL, CDN et nom de domaine personnalisé. Votre portfolio en ligne en moins de 5 minutes.",
			color: "bg-gradient-to-br from-dark-cyan to-dark-cyan/80",
			icon: "material-symbols:deployed-code-outline",
			features: ["Hébergement rapide", "SSL gratuit", "Support 24/7"],
		},
	];

	return (
		<section className=" py-24 px-6 bg-gray-50">
			<motion.div
				className="max-w-6xl mx-auto"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={containerVariants}
			>
				<motion.h2
					className="text-5xl font-bold text-navy text-center mb-16"
					variants={cardVariants}
				>
					Pourquoi choisir Portfolio Maker ?
				</motion.h2>

				<div className="grid md:grid-cols-3 gap-8">
					{sections.map((item, index) => (
						<motion.div
							key={index}
							variants={cardVariants}
							whileHover={{ scale: 1.03 }}
							className={`${item.color} p-8 rounded-2xl shadow-2xl text-white backdrop-blur-sm 
                         transform transition-all duration-300 hover:shadow-3xl`}
						>
							<div className="bg-white/10 p-4 rounded-xl inline-block mb-6">
								<Icon icon={item.icon} width={48} />
							</div>

							<h3 className="text-3xl font-bold mb-4">{item.title}</h3>
							<p className="text-lg opacity-90 mb-8">{item.description}</p>

							<ul className="space-y-3">
								{item.features.map((feature, i) => (
									<li key={i} className="flex items-center gap-2">
										<Icon icon="ph:check-circle-fill" className="text-white/90" />
										<span className="text-sm">{feature}</span>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
};

export default ChooseSection;
