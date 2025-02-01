"use client";
import React from "react";

const New = () => {
	return (
		<main className="flex flex-col items-center justify-start w-full h-full space-y-8">
			<h1 className="pt-20 text-xl font-semibold ml-4">Nouveau portfolio</h1>
			<div className="flex flex-row items-center justify-center w-10/12 mx-auto space-x-4">
				<div className="w-96 h-48 rounded-lg p-2 border bg-gray-300" />
				<div className="w-96 h-48 rounded-lg p-2 border bg-gray-300" />
				<div className="w-96 h-48 rounded-lg p-2 border bg-gray-300" />
			</div>
		</main>
	);
};

export default New;
