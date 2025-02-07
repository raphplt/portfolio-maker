import Head from "next/head";
import React from "react";

const Seo = () => {
	return (
		<Head>
			<title>Penfolio</title>
			<meta
				name="description"
				content="Créez votre portfolio en quelques minutes"
			/>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="robots" content="index, follow" />
			<meta property="og:title" content="Penfolio" />
			<meta
				property="og:description"
				content="Créez votre portfolio en quelques minutes"
			/>
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://votre-site.com" />
			<meta property="og:image" content="https://votre-site.com/og-image.jpg" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content="Penfolio" />
			<meta
				name="twitter:description"
				content="Créez votre portfolio en quelques minutes"
			/>
			<meta
				name="twitter:image"
				content="https://votre-site.com/twitter-image.jpg"
			/>
			<link rel="canonical" href="https://votre-site.com" />
		</Head>
	);
};

export default Seo;
